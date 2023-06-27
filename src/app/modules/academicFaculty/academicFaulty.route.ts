import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validations';
import { UserValidation } from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/enums';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-faculty',
  UserValidation.validateRequest(
    AcademicFacultyValidation.createFacultyZodSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.TEACHER
  ),
  AcademicFacultyController.getSingleFaculty
);

router.patch(
  '/:id',
  UserValidation.validateRequest(
    AcademicFacultyValidation.updatefacultyZodSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.updateFaculty
);

router.delete('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AcademicFacultyController.deleteFaculty);

router.get('/',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.TEACHER), AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
