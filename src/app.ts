import express, { Application } from 'express'
import cors from 'cors'
import userRoute from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRoute)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // next('Khaise! error')
//   throw Error('cool! error');
// })

//global error handler
app.use(globalErrorHandler)

export default app
