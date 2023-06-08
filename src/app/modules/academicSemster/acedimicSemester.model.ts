import { Schema, model } from 'mongoose';
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonthsName,
  academicSemesterTitles,
} from './academicSemester.constant';
import APIError from '../../../errors/ApiError';
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: [...academicSemesterTitles],
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: [...academicSemesterCodes],
    },
    startMonth: {
      type: String,
      required: true,
      enum: [...academicSemesterMonthsName],
    },
    endMonth: {
      type: String,
      required: true,
      enum: [...academicSemesterMonthsName],
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new APIError(status.CONFLICT, 'Academic Semester already exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
