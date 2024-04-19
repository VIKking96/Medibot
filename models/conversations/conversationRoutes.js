const express = require('express');
const Conversation = require('./conversationModel');
const { handleMessages } = require('./conversationController');

const router = express.Router();

// Initialize Socket.IO with the HTTP server
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(express);
const io = socketIo(server);

// Initialize socket.io event handlers
handleMessages(io);

// Route to retrieve conversation history for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find conversation history for the user
        const conversations = await Conversation.find({ $or: [{ user: userId }, { llm: userId }] })
            .populate('user llm', 'username') // Populate user and llm fields with their usernames
            .exec();

        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving conversation history', error });
    }
});

module.exports = router;
