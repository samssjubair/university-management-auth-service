import express from 'express';
import { userRouter } from '../modules/users/user.route';
import { academicSemesterRouter } from '../modules/academicSemster/academicSemester.route';
import { academicDepartmentRoutes } from '../modules/academicDepartments/academicDepartments.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaulty.route';
import { StudentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/academic-semesters',
    router: academicSemesterRouter,
  },
  {
    path: '/academic-departments',
    router: academicDepartmentRoutes,
  },
  {
    path: '/academic-faculties',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/students',
    router: StudentRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.router);
});

export default router;
