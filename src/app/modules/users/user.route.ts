import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-user',
  UserValidation.validateRequest,
  UserController.createUserController
)

export const userRouter = router
