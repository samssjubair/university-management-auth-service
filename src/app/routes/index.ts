import express from 'express';
import { userRouter } from '../modules/users/user.route';
import { academicSemesterRouter } from '../modules/academicSemster/academicSemester.route';

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
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.router);
});


export default router;
