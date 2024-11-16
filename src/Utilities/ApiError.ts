class ApiError extends Error {
  status: number;
  error: any[];
  success: boolean;

  constructor(
    status: number,
    message: string = "Something Went wrong",
    error: any[] = [],
    stack: string = ""
  ) {
    super(message);
    this.status = status;
    this.error = error;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
