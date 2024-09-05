import { ApiResponseOptions } from "@shared/types/responseType";
import {Request, NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodSchema } from "zod";



export const respond = <T>({
  res,
  data = undefined,
  message,
  statusCode = StatusCodes.OK,
  success = true,
}: ApiResponseOptions<T> & { res: Response }) => {
  const errorMessage = message instanceof Error ? message.message : message;

  return res.status(statusCode).json({
    success,
    message: errorMessage,
    data,
  });
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            ...req.body,
            ...req.query,
            ...req.params,
        });
        next();
    } catch (err) {
      const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
      const statusCode = StatusCodes.BAD_REQUEST;
      return respond({ res, message: errorMessage, statusCode, success: false });
    }
  };