import httpStatus from 'http-status';
import APIError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'User not found !');
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Password is incorrect !');
  }

  return {};
};

export const AuthService = {
  loginUser,
};
