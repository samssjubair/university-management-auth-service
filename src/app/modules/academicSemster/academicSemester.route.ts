import express from 'express';
import { UserValidation } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  UserValidation.validateRequest(
    AcademicSemesterValidation.createAcademicSemesterZodSchema
  ),
    AcademicSemesterController.createSemester
);

export const academicSemesterRouter = router;
