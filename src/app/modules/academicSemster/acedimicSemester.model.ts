import { Schema, model } from 'mongoose';
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface';
import { academicSemesterCodes, academicSemesterMonthsName, academicSemesterTitles } from './academicSemester.constant';



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
      enum: [...academicSemesterMonthsName]
    },
    endMonth: {
      type: String,
      required: true,
      enum: [...academicSemesterMonthsName]
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
