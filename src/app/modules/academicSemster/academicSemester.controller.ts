import { NextFunction, Request, RequestHandler, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";

const createSemester: RequestHandler= async (req: Request,res: Response,next: NextFunction) => {
    try {
        const {...academicSemesterData} = req.body;
        const result= await AcademicSemesterService.createSemester(academicSemesterData);
        res.status(200).json({
            success: true,
            message: 'Semester created successfully',
            data: result

        })
    } catch (error) {
        next(error)
        
    }
}

export const AcademicSemesterController={
    createSemester
}