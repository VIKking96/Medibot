const Conversation = require('./conversationModel');

// Function to handle sending and receiving messages via websockets
exports.handleMessages = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        // Assigning the user to a room based on their user ID
        socket.on('joinRoom', ({ userId }) => {
            socket.join(userId);
            console.log(`User ${socket.id} joined room ${userId}`);
        });

        // Listen for incoming messages from the client
        socket.on('message', async (data) => {
            try {
                const { sender, receiver, content } = data;

                // Save the message to the database
                const conversation = await Conversation.findOneAndUpdate(
                    { participants: { $all: [sender, receiver] } },
                    { $push: { messages: { sender, content } } },
                    { upsert: true, new: true }
                );

                // Emit the message to the sender and receiver
                socket.to(sender).to(receiver).emit('message', { sender, content });
            } catch (error) {
                console.error('Error handling message:', error);
                socket.emit('error', 'Message could not be sent.');
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected', socket.id);
        });
    });
};
