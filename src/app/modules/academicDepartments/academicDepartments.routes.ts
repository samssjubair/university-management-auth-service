import express from 'express';
import { AcademicDepartmentController } from './academicDepartments.controller';
import { AcademicDepartmentValidation } from './academicDepartments.validations';
import { UserValidation } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-department',
  UserValidation.validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  UserValidation.validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

export const academicDepartmentRoutes = router;
