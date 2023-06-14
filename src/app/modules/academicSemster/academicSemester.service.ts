import { SortOrder } from 'mongoose';
import APIError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/common';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
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
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters;

  const academicSemesterSearchableFields: string[] = ['title', 'code'];
  const andConditions = [];

  // const andConditions=[
  //   {
  //     $or: [
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       },
  //       {
  //         title:{
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       }
  //     ]
  //   }
  // ]

  // instead of that

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginations(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
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
