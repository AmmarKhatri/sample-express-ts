"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const routes_1 = require("./routes");
const database_1 = require("./config/database");
const websockets_1 = require("./websockets");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Create HTTP server
const httpServer = (0, http_1.createServer)(app);
// Initialize Socket.IO
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
// Setup WebSockets
(0, websockets_1.setupWebSockets)(io);
// Initialize database connection
(0, database_1.initializeDatabase)()
    .then(() => {
    console.log('Database connected successfully');
    // Setup API routes
    (0, routes_1.setupRoutes)(app);
    // Start the server
    httpServer.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});
