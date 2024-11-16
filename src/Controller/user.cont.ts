import { ApiResponse } from "../Utilities/ApiResponse";
import { ApiError } from "../Utilities/ApiError";
import { asyncHandler } from "../Utilities/asyncHandler";
import { userModel } from "../Models/user.model";
import { Request, Response } from "express";

interface SignUpRequest extends Request {
  body: {
    u_id: string;
    u_name: string;
    password?: string;
  };
}

const signUp = asyncHandler(async (req: SignUpRequest, res: Response) => {
  const { u_name, u_id, password } = req.body;
  if (![u_name, u_id, password].every(Boolean))
    throw new ApiError(400, "All Parameters are required !!!");
  const userExistance = await userModel.isUserCheck(u_id.trim());
  if (userExistance) throw new ApiError(400, "User already exist !!!");
  const user = await userModel.create({ u_name, u_id: u_id.trim(), password });
  res
    .status(200)
    .json(new ApiResponse(200, { data: user }, "User SignUp Successfully"));
});

const login = asyncHandler(async (req: SignUpRequest, res: Response) => {
  const { u_id, password } = req.body;
  if (![u_id, password].every(Boolean))
    throw new ApiError(400, "All parameters are required !!!");
  const isUserCheck = await userModel.isUserCheck(u_id.trim());
  if (!isUserCheck) throw new ApiError(400, "User does not exist !!!");
  if (typeof password === "undefined") {
    throw new ApiError(400, "Password is required");
  }
  const passMatch = await isUserCheck.isPassMatch(password);
  if (!passMatch) throw new ApiError(400, "Invalid Password !!!");
  const isAccessToken = await isUserCheck.isAccessToken();

  res
    .cookie("token", isAccessToken)
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: isUserCheck, isAccessToken },
        "Login Success !!!"
      )
    );
});

export { signUp, login };
