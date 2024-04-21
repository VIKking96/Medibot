const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // Adjust this as per your frontend's URL
        methods: ["GET", "POST"]
    }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./models/users/userRoutes');
const conversationRoutes = require('./models/conversations/conversationRoutes')(io); // Pass 'io' to the routes

// Routes
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
