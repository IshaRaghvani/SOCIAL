import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
  Chatusers: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  Sender:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }

},{timestamps: true});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
