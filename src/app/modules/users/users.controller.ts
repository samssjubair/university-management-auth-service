import { Request, Response } from "express";
import { createUser } from "./users.service";

export const createUserController = async (req: Request, res: Response) => {
    
    try {
        const { user } = req.body;
        const result= await createUser(user);
        res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create user"
        })
    }
}