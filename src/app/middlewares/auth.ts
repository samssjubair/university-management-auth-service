import { NextFunction, Request, Response } from "express";
import APIError from "../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth =(...requiredRoles: string[])=>async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token= req.headers.authorization;
        if(!token){
            throw new APIError(httpStatus.UNAUTHORIZED, 'Token not found');
        }
        let verifiedUser= null;
        verifiedUser= jwtHelper.verifyToken(token, config.jwt.secret as Secret);
        
        req.user= verifiedUser;

        if(requiredRoles.length){
            if(!requiredRoles.includes(verifiedUser.role)){
                throw new APIError(httpStatus.UNAUTHORIZED, 'You are not authorized to access this route');
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default auth;