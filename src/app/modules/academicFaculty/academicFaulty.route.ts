import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validations';
import { UserValidation } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-faculty',
  UserValidation.validateRequest(
    AcademicFacultyValidation.createFacultyZodSchema
  ),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.patch(
  '/:id',
  UserValidation.validateRequest(
    AcademicFacultyValidation.updatefacultyZodSchema
  ),
  AcademicFacultyController.updateFaculty
);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
