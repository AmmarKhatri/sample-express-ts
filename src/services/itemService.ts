import Item from '../models/Item';
// All the DB calling methods are residing here
//  -------- SERVICES CAN BE ABSTRACTED HERE --------
export const getAllItems = async (): Promise<Item[]> => {
  return await Item.findAll();
};

export const getItemById = async (id: string): Promise<Item | null> => {
  return await Item.findByPk(id);
};

export const createItem = async (itemData: Item): Promise<Item> => {
  itemData.isActive = true; //manual intervention for data manipulation
  return await Item.create(itemData);
};

export const updateItem = async (id: string, itemData: Partial<Item>): Promise<Item | null> => {
  const item = await getItemById(id);
  if (!item) return null;
  
  return await item.update(itemData);
};

export const deleteItem = async (id: string): Promise<boolean> => {
  const deletedRows = await Item.destroy({
    where: { id }
  });
  return deletedRows > 0;
}; 