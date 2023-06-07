import { RequestHandler } from 'express';
import { UserService } from './user.service';

const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUserController,
};
