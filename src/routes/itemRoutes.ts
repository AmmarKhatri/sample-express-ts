import { Router } from 'express';
import * as itemController from '../controllers/itemController';

const router = Router();

router.get('/', async (req, res) => {
  await itemController.getAllItems(req, res);
});
router.get('/:id', async (req, res) => {
  await itemController.getItemById(req, res);
});
router.post('/', async (req, res) => {
  await itemController.createItem(req, res);
});
router.put('/:id', async (req, res) => {
  await itemController.updateItem(req, res);
});
router.delete('/:id', async (req, res) => {
  await itemController.deleteItem(req, res);
});

export default router; 