import { Sequelize } from "sequelize"
import UserModel from "./User"
import TaskModel from "./Task"

const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/../config/config.json")[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize),
  Task: TaskModel(sequelize),
}

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db)
  }
})

export default db

