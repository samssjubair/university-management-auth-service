import express from 'express';
import { UserValidation } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.get('/get-semesters', AcademicSemesterController.getAllSemesters);

router.patch(
  '/:id',
  UserValidation.validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterZodSchema
  ),
  AcademicSemesterController.updateSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.post(
  '/create-semester',
  UserValidation.validateRequest(
    AcademicSemesterValidation.createAcademicSemesterZodSchema
  ),
  AcademicSemesterController.createSemester
);

router.delete('/:id', AcademicSemesterController.deleteSemester);

export const academicSemesterRouter = router;
