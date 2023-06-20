import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from '../../middlewares/validateRequest';
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createStudentZodSchema,
} from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  UserValidation.validateRequest(createStudentZodSchema),
  UserController.createStudentController
);

router.post(
  '/create-faculty',
  UserValidation.validateRequest(createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  UserValidation.validateRequest(createAdminZodSchema),
  UserController.createAdmin
);

export const userRouter = router;
