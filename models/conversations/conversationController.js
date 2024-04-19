const Conversation = require('./conversationModel');

// Function to handle sending and receiving messages via websockets
exports.handleMessages = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Listen for incoming messages from the client
        socket.on('message', async (data) => {
            try {
                // Assuming data contains information like sender, receiver, and content
                const { sender, receiver, content } = data;

                // Save the message to the database
                const conversation = await Conversation.findOneAndUpdate(
                    { user: receiver, llm: sender },
                    { $push: { messages: { sender, receiver, content } } },
                    { upsert: true, new: true }
                );

                // Emit the message to the sender and receiver
                socket.emit('message', conversation.messages);
                io.to(receiver).emit('message', conversation.messages);
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
