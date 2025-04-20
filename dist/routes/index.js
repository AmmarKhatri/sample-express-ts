"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const itemRoutes_1 = __importDefault(require("./itemRoutes"));
const setupRoutes = (app) => {
    app.use('/api/v1/items', itemRoutes_1.default);
    // Add more routes as needed
    // Default route
    app.get('/', (req, res) => {
        res.send('API is running');
    });
};
exports.setupRoutes = setupRoutes;
