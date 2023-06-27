import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IAcademicFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser | null>>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
