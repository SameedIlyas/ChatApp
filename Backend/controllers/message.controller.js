import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import axios from "axios";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find or create the conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create and save the new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    if (receiverId === '66d8a3574eebe7f0a634593c') { // Check if the recipient is "AI"
      try {
        const response = await axios.post(
          process.env.HUGGING_FACE_API_URL, // Ensure this is set to the GPT-2 model URL
          { inputs: message },
          {
            headers: {
              'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Extract the AI response
        const aiMessageText = response.data[0]?.generated_text || "Sorry, I couldn't understand that.";

        // Create and save the AI message
        const aiMessage = new Message({
          senderId: '66d8a3574eebe7f0a634593c',
          receiverId: senderId,
          message: aiMessageText,
        });

        conversation.messages.push(aiMessage._id);
        await Promise.all([aiMessage.save(), conversation.save()]);

        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit("newMessage", aiMessage);
        }

        res.status(201).json(aiMessage);
      } catch (error) {
        console.log("Error calling Hugging Face API: ", error.response?.data || error.message);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json(newMessage);
    }
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
