import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import { errorHandler } from "./middleware/errorHandler"
import db from "./models"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  }),
)
app.use(express.json());
app.use((req, _res, next) => {
    console.log('Incoming Request Body:', req.body);
    next();
});

app.use("/api/tasks", taskRoutes)
app.use("/auth", authRoutes)

app.use(errorHandler)

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err: Error) => {
    console.error("Failed to sync database:", err)
  })

