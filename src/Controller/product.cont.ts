import { Request, Response } from "express";
import { ApiError } from "../Utilities/ApiError";
import { ApiResponse } from "../Utilities/ApiResponse";
import { asyncHandler } from "../Utilities/asyncHandler";
import { productModel } from "../Models/produc.model";

const productCreation = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, active } = req.body;
  if (![name, description, price].every(Boolean))
    throw new ApiError(400, "All parameters are required !!!");
  const response = await productModel.create({
    name,
    description,
    price,
    active,
  });
  res.status(200).json(new ApiResponse(200, { data: response }));
});

export { productCreation };
