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

const updateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z
      .enum([...academicSemesterTitles] as [string, ...string[]], {
        required_error: 'Title is required',
      })
      .optional(),
    year: z.number().optional(),
    code: z
      .enum([...academicSemesterCodes] as [string, ...string[]])
      .optional(),
    startMonth: z
      .enum([...academicSemesterMonthsName] as [string, ...string[]], {
        required_error: 'Start month is required',
      })
      .optional(),
    endMonth: z
      .enum([...academicSemesterMonthsName] as [string, ...string[]], {
        required_error: 'End month is required',
      })
      .optional(),
  })
}).refine(data=>(data.body.title && data.body.code) || (!data.body.title && !data.body.code),{
    message: 'Either both title or year is required or neither'
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
