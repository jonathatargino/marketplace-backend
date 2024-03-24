import { ValidationError as ClassValidatorValidationError } from "class-validator";

export class ValidationError extends Error {
  public messages: Record<string, string[]>;

  constructor(errors: ClassValidatorValidationError[]) {
    super();
    this.name = "ValidationError";
    this.messages = {};
    errors.forEach((error) => (this.messages[error.property] = Object.values(error.constraints)));
  }
}
