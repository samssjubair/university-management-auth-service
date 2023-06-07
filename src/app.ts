import express, { Application } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/users/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import { academicSemesterRouter } from './app/modules/academicSemster/academicSemester.route';

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/academic-semesters', academicSemesterRouter);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // next('Khaise! error')
//   //   throw Error('cool! error');
//   Promise.reject('Unhandled Promise Rejection')

//   //server will crash
// })

//global error handler
app.use(globalErrorHandler);

export default app;
