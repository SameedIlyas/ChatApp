import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app); // Create the HTTP server for Socket.io

// Initialize Socket.io with CORS configuration
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"], // Update this with your Vercel or frontend URL
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; // Map to store user IDs and their socket IDs

// Function to get the socket ID of a user by their user ID
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

// Handle socket connections
io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	// Get the user ID from the socket handshake query
	const userId = socket.handshake.query.userId;
	if (userId !== "undefined") userSocketMap[userId] = socket.id;

	// Emit the list of online users to all connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// Handle disconnections
	socket.on("disconnect", () => {
		console.log("User disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

// Export the `app`, `io`, and `server` for use in other modules
export { app, io, server };
