import { HttpError } from "../../domain/error/HttpError";
import { Request, Response, NextFunction } from "express";

export default function httpErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error.name === "HttpError") {
    res.status((error as HttpError).statusCode).send({ message: error.message });
  }

  next(error);
}
