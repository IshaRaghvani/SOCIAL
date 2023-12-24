// routes/chat.js
import express from "express";

import { verifyToken } from "../middleware/auth.js";
import { sendMessage,getChatHistory } from "../controllers/chat.js";

const router = express.Router();

router.post('/msg',verifyToken,sendMessage);
router.get('/get/chat/msg/:user1Id/:user2Id',getChatHistory );
// router.get('/users', chat.getUserList);

export default router;
