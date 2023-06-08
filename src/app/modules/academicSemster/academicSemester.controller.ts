import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
};
