import APIError from '../../../errors/ApiError';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/common';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './acedimicSemester.model';
import status from 'http-status';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new APIError(
      status.BAD_REQUEST,
      'Invalid title and code combination'
    );
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
