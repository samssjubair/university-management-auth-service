import { NextFunction, Request, Response } from 'express'
import { createUser } from './users.service'

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body
    const result = await createUser(user)
    res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
    // throw new APIError(404,'Failed to create user');
    // res.status(400).json({
    //   success: false,
    //   message: 'Failed to create user',
    // })
  }
}
