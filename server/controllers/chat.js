// controllers/chatController.js
import Chat from "../models/Chat.js";

import mongoose from 'mongoose';


// exports.getChatHistory = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const chatHistory = await Chat.find({ participants: userId });
//     res.json(chatHistory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// exports.sendChat = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { recipientId, message } = req.body;

//     const chat = await Chat.findOneAndUpdate(
//       { participants: { $all: [userId, recipientId] } },
//       { $push: { messages: { sender: userId, content: message } } },
//       { upsert: true, new: true }
//     );

//     res.json(chat);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// exports.getUserList = async (req, res) => {
//   try {
//     const users = await User.find({}, '_id username');
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };





export async function sendMessage(req, res) {
  try {
    const { from, to, message } = req.body;

    // Log the entire request payload
    console.log('Request Payload:', req.body);


    // Attempt to create a new message
    const newmessage = await Chat.create({
      message: message,
      Chatusers: [from, to], // Use senderObjectId here
      Sender: from,
    });

    // Log created message for debugging
    console.log('Created Message:', newmessage);

    // Return the created message in the response
    return res.status(200).json(newmessage);
  } catch (error) {
    // Log error for debugging
    console.error('Error in sendMessage:', error);
    return res.status(500).json('Internal Server error');
  }
}






//create message
export async function getChatHistory(req, res) {
  try {
    const from = req.params.user1Id;
    const to = req.params.user2Id;

    const newmessage = await Chat.find({
      Chatusers: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const allmessage = newmessage.map((msg) => {
      return {
        myself: msg.Sender.toString() === from,
        message: msg.message,
      };
    });
    return res.status(200).json(allmessage);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};
