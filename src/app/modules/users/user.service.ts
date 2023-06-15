import { status } from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config';
import APIError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AcademicSemester } from '../academicSemster/acedimicSemester.model';
import { Student } from '../student/student.model';

const createStudent = async (student: IStudent, user: IUser): Promise<IUser | null> => {
  
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  user.role='student';
  let newUserAllData=null;

  const academicSemester= await AcademicSemester.findById(student.academicSemester);

  const session= await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateStudentId(academicSemester);
    user.id=id;
    student.id=id;
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new APIError(status.BAD_REQUEST, 'Failed to create student');
    }
    user.student= newStudent[0]._id;
    const newUser= await User.create([user], {session});
    if(!newUser.length){
      throw new APIError(status.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData= newUser[0];
    await session.commitTransaction();
    session.endSession();

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
    
  }

  if(newUserAllData){
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;

  

};

export const UserService = {
  createStudent,
};
