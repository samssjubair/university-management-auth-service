import httpStatus from 'http-status';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import routes from './app/routes';

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // next('Khaise! error')
//   //   throw Error('cool! error');
//   Promise.reject('Unhandled Promise Rejection')

//   //server will crash
// })

//global error handler
app.use(globalErrorHandler);

// not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
