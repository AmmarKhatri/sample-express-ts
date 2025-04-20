"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getAllItems = void 0;
const itemService = __importStar(require("../services/itemService"));
const websockets_1 = require("../websockets");
const getAllItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        return res.status(200).json(items);
    }
    catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllItems = getAllItems;
const getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await itemService.getItemById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(200).json(item);
    }
    catch (error) {
        console.error('Error fetching item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getItemById = getItemById;
const createItem = async (req, res) => {
    try {
        const itemData = req.body;
        const newItem = await itemService.createItem(itemData);
        // Notify connected clients about the new item
        const io = (0, websockets_1.getIoInstance)();
        io.emit('item:created', newItem);
        return res.status(201).json(newItem);
    }
    catch (error) {
        console.error('Error creating item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const itemData = req.body;
        const updatedItem = await itemService.updateItem(id, itemData);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        // Notify connected clients about the updated item
        const io = (0, websockets_1.getIoInstance)();
        io.emit('item:updated', updatedItem);
        return res.status(200).json(updatedItem);
    }
    catch (error) {
        console.error('Error updating item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await itemService.deleteItem(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Item not found' });
        }
        // Notify connected clients about the deleted item
        const io = (0, websockets_1.getIoInstance)();
        io.emit('item:deleted', { id });
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteItem = deleteItem;
