import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../Utilities/asyncHandler";
import { ApiError } from "../Utilities/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../Models/user.model";

interface AuthenticatedRequest extends Request {
  user?: string;
}

const authMiddleware = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const SECRET = "topSecret";
      const token = req?.body?.token;

      if (!token)
        throw new ApiError(404, "Token not found in this request !!!");
      const decodeData = jwt.verify(token, SECRET) as JwtPayload;
      console.log("req.cookies", decodeData);
      let userCheck = await userModel.isUserCheck(decodeData.u_id);
      if (!userCheck) throw new ApiError(400, "invalid payload");
      req.user = userCheck.u_id;
      next();
    } catch (error) {
      console.log("Error ", error);
      throw new ApiError(400, "Invalid token");
    }
  }
);

export { authMiddleware };
