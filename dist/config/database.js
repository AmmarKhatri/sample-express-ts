"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'database', process.env.DB_USER || 'user', process.env.DB_PASSWORD || 'password', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', // or 'mysql', 'sqlite', 'mariadb', 'mssql'
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
async function initializeDatabase() {
    try {
        await sequelize.sync();
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}
exports.default = sequelize;
