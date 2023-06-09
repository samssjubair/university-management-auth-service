import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters: RequestHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const paginationOptions = pick(req.query, paginationFields);
        // console.log(paginationOptions);

        const result = await AcademicSemesterService.getAllSemesters(paginationOptions);

        sendResponse<IAcademicSemester[]>(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semesters fetched successfully',
            meta: result.meta,
            data: result.data
        })
        next();

        })

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters
};
