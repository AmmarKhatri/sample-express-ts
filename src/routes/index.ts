import { Express } from 'express';
import itemRoutes from './itemRoutes';

export const setupRoutes = (app: Express) => {
  app.use('/api/v1/items', itemRoutes);
  
  // Add more routes as needed
  
  // Default route
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}; 