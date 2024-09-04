import User from "../model/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendFriendRequest = async (req, res) => {
    try {
        const { recipientUsername } = req.body;
        const senderId = req.user._id;

        const recipient = await User.findOne({ userName: recipientUsername });

        if (!recipient) {
            return res.status(404).json({ message: "User not found" });
        }

        if (recipient.friends.includes(senderId) || recipient.friendRequests.includes(senderId)) {
            return res.status(400).json({ message: "Request already sent or user already a friend" });
        }

        recipient.friendRequests.push(senderId);
        await recipient.save();

        res.status(200).json({ message: "Friend request sent" });

        const receiverSocketId = getReceiverSocketId(recipient._id);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("friendRequestReceived", { senderId });
        }

    } catch (error) {
        console.error("Error in sendFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const { senderId } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!user || !sender) {
            return res.status(404).json({ message: "User not found" });
        }

        user.friendRequests = user.friendRequests.filter(id => id.toString() !== senderId);
        user.friends.push(senderId);
        sender.friends.push(userId);

        await user.save();
        await sender.save();

        res.status(200).json({ message: "Friend request accepted" });

        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
            io.to(senderSocketId).emit("friendRequestAccepted", { userId });
        }

    } catch (error) {
        console.error("Error in acceptFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const declineFriendRequest = async (req, res) => {
    try {
        const { senderId } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.friendRequests = user.friendRequests.filter(id => id.toString() !== senderId);
        await user.save();

        res.status(200).json({ message: "Friend request declined" });

    } catch (error) {
        console.error("Error in declineFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate('friendRequests', 'userName fullName profilePic');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.friendRequests);

    } catch (error) {
        console.error("Error in getFriendRequests controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getFriendsList = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate('friends', 'userName fullName profilePic');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.friends);

    } catch (error) {
        console.error("Error in getFriendsList controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


