import { Request, Response } from 'express';
import * as itemService from '../services/itemService';
import { getIoInstance } from '../websockets';

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await itemService.getAllItems();
    return res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log('id', id);
    const item = await itemService.getItemById(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    return res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const itemData = req.body;
    const newItem = await itemService.createItem(itemData);
    
    // Notify connected clients about the new item
    const io = getIoInstance();
    io.emit('item:created', newItem);
    
    return res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const itemData = req.body;
    
    const updatedItem = await itemService.updateItem(id, itemData);
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Notify connected clients about the updated item
    const io = getIoInstance();
    io.emit('item:updated', updatedItem);
    
    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await itemService.deleteItem(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Notify connected clients about the deleted item
    const io = getIoInstance();
    io.emit('item:deleted', { id });
    
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 