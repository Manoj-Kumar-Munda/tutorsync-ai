import { ApiError } from '../utils/api-error';
import { NextFunction, Request, Response } from 'express';
import ApiResponse, { ErrorDetail } from '../utils/api-response';
import { ZodError } from 'zod';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

const errorHandler = (
  err: Error | ApiError | ZodError,
  req: Request,
  res: Response
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errors: string | ErrorDetail[] | undefined;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    errors = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
      code: issue.code,
    }));
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors.length > 0 ? err.errors : undefined;
  } else if (err instanceof Error) {
    message = err.message;
    errors = err.message;
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      statusCode,
      message,
      errors,
      stack: err.stack,
    });
  }

  res
    .status(statusCode)
    .json(new ApiResponse(statusCode, message, null, errors));
};

export { notFoundHandler, errorHandler };
