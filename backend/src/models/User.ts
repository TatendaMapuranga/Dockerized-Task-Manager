import { type Model, DataTypes, type Sequelize } from "sequelize"
import {z} from "zod"

export const UserSchema = z.object({
    id: z.number().optional(),
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1, { message: "Name is required" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export interface TaskAttributes {
  id?: number
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
  dueDate?: Date
  userId: number
  createdAt?: Date
  updatedAt?: Date
}

export interface TaskInstance extends Model<TaskAttributes>, TaskAttributes {}

export default (sequelize: Sequelize) => {
  const Task = sequelize.define<TaskInstance>("Task", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      defaultValue: "pending",
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })

  return Task
}
