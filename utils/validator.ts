import { ValidationError } from "express-json-validator-middleware";

export function validationErrorMiddleware(
  error: any,
  request: any,
  response: any,
  next: any
) {
  if (response.headersSent) {
    return next(error);
  }
  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }

  let msg = "bad request";
  if (error.validationErrors.body?.length) {
    msg = error.validationErrors.body[0].message || msg;
  }

  response.status(400).json({
    code: 1,
    msg: msg,
  });

  next();
}
