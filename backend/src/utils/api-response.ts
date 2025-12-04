export interface ErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

class ApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T | null;
  error?: string | ErrorDetail[];

  constructor(
    statusCode: number,
    message: string,
    data?: T,
    error?: string | ErrorDetail[]
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.data = data || null;
    this.error = error;
  }
}

export default ApiResponse;
