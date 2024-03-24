import { ValidationError } from "../../domain/error/ValidationError";
import { Request, Response, NextFunction } from "express";

export default function validationErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error.name === "ValidationError") {
    res.status(400).send({ messages: (error as ValidationError).messages });
  }

  next();
}
