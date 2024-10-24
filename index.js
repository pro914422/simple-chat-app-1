const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the project root
app.use(express.static(path.join(__dirname))); // Ensure this points to your HTML file

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  io.emit("message", message);

  socket.on('user-message', (message) => {
    console.log('Message received:', message);
    io.emit('chat message', message); // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = 9001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
