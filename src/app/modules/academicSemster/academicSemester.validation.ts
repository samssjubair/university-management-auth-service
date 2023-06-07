import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonthsName,
  academicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number(),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum(
      [...academicSemesterMonthsName] as [string, ...string[]],
      { required_error: 'Start month is required' }
    ),
    endMonth: z.enum([...academicSemesterMonthsName] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
