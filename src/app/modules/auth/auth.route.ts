import express from 'express';
import { UserValidation } from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/enums';

const router = express.Router();

router.post(
  '/login',
  UserValidation.validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  UserValidation.validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  UserValidation.validateRequest(AuthValidation.changePasswordZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.STUDENT),
  AuthController.changePassword
);

export const AuthRoutes = router;
