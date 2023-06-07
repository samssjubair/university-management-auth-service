import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from '../../middlewares/validateRequest';
import createUserZodSchema from './user.validation';
const router = express.Router();

router.post(
  '/create-user',
  UserValidation.validateRequest(createUserZodSchema),
  UserController.createUserController
);

export const userRouter = router;
