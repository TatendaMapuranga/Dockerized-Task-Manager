import type { Request, Response, NextFunction } from "express"
import { pool } from "../config/db"
import { z } from "zod"
import type { AuthRequest } from "../middleware/auth"

const TaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
  dueDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
})

export const taskController = {
  getAllTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest
      if (!authReq.user?.id) {
        return res.status(401).json({ error: "Not authenticated" })
      }
      const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC", [
        authReq.user.id,
      ])
      const transformedTasks = result.rows.map((task) => ({
        ...task,
        dueDate: task.due_date,
      }))
      res.json(transformedTasks)
    } catch (error) {
      next(error)
    }
  },

  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest
      if (!authReq.user?.id) {
        return res.status(401).json({ error: "Not authenticated" })
      }
      const validatedTask = TaskSchema.parse(req.body)
      const result = await pool.query(
        "INSERT INTO tasks (title, description, status, due_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          validatedTask.title,
          validatedTask.description || null,
          validatedTask.status,
          validatedTask.dueDate ? new Date(validatedTask.dueDate) : null,
          authReq.user.id,
        ],
      )
      res.status(201).json(result.rows[0])
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid task data", details: error.errors })
      } else {
        next(error)
      }
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest
      const { id } = req.params
      if (!authReq.user?.id) {
        return res.status(401).json({ error: "Not authenticated" })
      }
      const validatedTask = TaskSchema.parse(req.body)
      const result = await pool.query(
        "UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
        [
          validatedTask.title,
          validatedTask.description || null,
          validatedTask.status,
          validatedTask.dueDate ? new Date(validatedTask.dueDate) : null,
          id,
          authReq.user.id,
        ],
      )
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Task not found" })
      }
      res.json(result.rows[0])
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid task data", details: error.errors })
      } else {
        next(error)
      }
    }
  },

  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest
      const { id } = req.params
      if (!authReq.user?.id) {
        return res.status(401).json({ error: "Not authenticated" })
      }
      const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [id, authReq.user.id])
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Task not found" })
      }
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}

