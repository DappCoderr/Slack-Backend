import { StatusCodes } from "http-status-codes"

import { signUpService } from "../service/userService"
import { customErrorResponse, successResponse } from "../utils/common/responseObject"

export const signUp = async(req, res) => {
    try {
        const user = await signUpService(req.body)
        return res.status(StatusCodes.CREATED).json(successResponse(user, "User Created Successfully"))
    } catch (error) {
        
        console.lor("User controller error: ", error)
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error))
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json
    }
}