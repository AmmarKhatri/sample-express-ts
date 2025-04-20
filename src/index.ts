import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupRoutes } from './routes';
import { initializeDatabase } from './config/database';
import { setupWebSockets } from './websockets';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Setup WebSockets
setupWebSockets(io);

// Initialize database connection
initializeDatabase()
  .then(() => {
    console.log('Database connected successfully');
    
    // Setup API routes
    setupRoutes(app);
    
    // Start the server
    httpServer.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
    initializeDatabase();
    process.exit(1);
  });
