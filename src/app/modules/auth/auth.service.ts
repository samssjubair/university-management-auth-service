import httpStatus from 'http-status';
import APIError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in as string }
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in as string }
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
