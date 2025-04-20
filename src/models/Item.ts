import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database'; // You'll need to create this connection file

// Interface for Item attributes
interface ItemAttributes {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for creation attributes - optional fields that can be null/undefined during creation
interface ItemCreationAttributes extends Optional<ItemAttributes, 'id' | 'isActive' | 'createdAt' | 'updatedAt'> {}

class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public id!: string;
  public name!: string;
  public description!: string | undefined;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Item.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'items',
    timestamps: true,
  }
);

export default Item; 