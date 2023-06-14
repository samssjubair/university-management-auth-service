import {
  IAcademicSemesterMonthsName,
  IAcademicSemesterSemesterCodes,
  IAcademicSemesterSemesterTitles,
} from './academicSemester.interface';

export const academicSemesterMonthsName: IAcademicSemesterMonthsName[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitles: IAcademicSemesterSemesterTitles[] = [
  'Fall',
  'Spring',
  'Summer',
];

export const academicSemesterCodes: IAcademicSemesterSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Fall: '01',
  Spring: '02',
  Summer: '03',
};

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];

export const academicSemesterSearchableFields = ['title', 'code', 'year'];
