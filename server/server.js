const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    },
});
const port = 3001;

app.use(cors());

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat_message', (name, message) => {
        const messageId = Date.now(); 
        io.emit('received_message', { id: messageId, sender: name, message: message });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});