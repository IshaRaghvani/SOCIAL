import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import chatRoutes from "./routes/chat.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Chat from "./models/Chat.js";
import { users, posts } from "./data/index.js";
import { Server } from "socket.io";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/chat", chatRoutes);

/* ADD DATA ONE TIME */
// User.insertMany(users);
// Post.insertMany(posts);

/* MONGOOSE SETUP */
const PORT = process.env.SERVER_PORT || 3001;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // Drop the collections
    //await Chat.collection.drop();
    // await Post.collection.drop();

    // // Insert data again
    // await User.insertMany(users);
    // await Post.insertMany(posts);
    const server = app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });
    
    const onlineUsers = new Map();
    io.on("connection", (socket) => {
      
      socket.on("getUser", (id) => {
        console.log(`User ${id} connected`);
        onlineUsers.set(id, socket.id);
      });
    
      socket.on("send-msg", (data)=>{
        console.log(`Received message: ${data.message} from ${data.from} to ${data.to}`);
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
          socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
      })
    });
    
  })
  .catch((error) => console.log(`${error} did not connect`));

