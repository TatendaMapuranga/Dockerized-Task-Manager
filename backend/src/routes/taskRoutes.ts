import { Router } from "express"
import { taskController } from "../controllers/taskController"
import { authMiddleware, type AuthRequest } from "../middleware/auth"
import type { Request, Response, NextFunction } from "express"

const router = Router()

// Apply auth middleware to all routes
router.use(authMiddleware as (req: Request, res: Response, next: NextFunction) => void)

// Wrapper function to handle async controllers
const asyncHandler =
  (fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as AuthRequest, res, next)).catch(next)
  }

router.get("/", asyncHandler(taskController.getAllTasks))
router.post("/", asyncHandler(taskController.createTask))
router.put("/:id", asyncHandler(taskController.updateTask))
router.delete("/:id", asyncHandler(taskController.deleteTask))

export default router

