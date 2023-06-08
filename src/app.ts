import express, { Application } from 'express';
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

export default app;
