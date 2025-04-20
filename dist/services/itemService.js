"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getAllItems = void 0;
const Item_1 = __importDefault(require("../models/Item"));
const getAllItems = async () => {
    return await Item_1.default.findAll();
};
exports.getAllItems = getAllItems;
const getItemById = async (id) => {
    return await Item_1.default.findByPk(id);
};
exports.getItemById = getItemById;
const createItem = async (itemData) => {
    return await Item_1.default.create(itemData);
};
exports.createItem = createItem;
const updateItem = async (id, itemData) => {
    const item = await (0, exports.getItemById)(id);
    if (!item)
        return null;
    return await item.update(itemData);
};
exports.updateItem = updateItem;
const deleteItem = async (id) => {
    const deletedRows = await Item_1.default.destroy({
        where: { id }
    });
    return deletedRows > 0;
};
exports.deleteItem = deleteItem;
