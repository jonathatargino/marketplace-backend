import { validate } from "class-validator";
import { ValidationError } from "../../domain/error/ValidationError";

export default async function validateDTO(dto: object) {
  const errors = await validate(dto, { stopAtFirstError: true });

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
}
