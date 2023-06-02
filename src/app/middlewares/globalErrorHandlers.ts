import { NextFunction, Request, Response } from "express"

const globalErrorHandler= (err,req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        message: err,
    })
    next();
//   if(err instanceof Error){
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     })
//   }
//   else{
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//     })
//   }

}

export default globalErrorHandler;