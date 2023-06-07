import { Model } from 'mongoose';

export type IAcademicSemesterSemesterTitles = 'Fall' | 'Spring' | 'Summer';

export type IAcademicSemesterSemesterCodes = '01' | '02' | '03';

export type IAcademicSemesterMonthsName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemester = {
  title: IAcademicSemesterSemesterTitles;
  year: number;
  code: IAcademicSemesterSemesterCodes;
  startMonth: IAcademicSemesterMonthsName;
  endMonth: IAcademicSemesterMonthsName;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
