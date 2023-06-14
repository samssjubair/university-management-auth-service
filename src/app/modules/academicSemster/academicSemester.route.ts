import express from 'express';
import { UserValidation } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.get('/get-user', AcademicSemesterController.getAllSemesters);

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




export const academicSemesterRouter = router;
