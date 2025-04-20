"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIoInstance = exports.setupWebSockets = void 0;
let io;
const setupWebSockets = (socketIo) => {
    io = socketIo;
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
        // Add custom event handlers
        socket.on('join:room', (roomId) => {
            socket.join(roomId);
            console.log(`Socket ${socket.id} joined room ${roomId}`);
        });
        socket.on('leave:room', (roomId) => {
            socket.leave(roomId);
            console.log(`Socket ${socket.id} left room ${roomId}`);
        });
    });
    return io;
};
exports.setupWebSockets = setupWebSockets;
const getIoInstance = () => {
    if (!io) {
        throw new Error('Socket.IO has not been initialized');
    }
    return io;
};
exports.getIoInstance = getIoInstance;
