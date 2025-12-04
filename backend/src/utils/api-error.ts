import { ErrorDetail } from './api-response';

class ApiError extends Error {
  statusCode: number;
  success: boolean;
  message: string;
  errors: ErrorDetail[];

  constructor(
    statusCode: number,
    message = 'Something went wrong',
    errors: ErrorDetail[] = [],
    stack = ''
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
