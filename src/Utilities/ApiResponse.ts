class ApiResponse<T> {
  status: number;
  data: T;
  message: string;
  success: any;

  constructor(status: number, data: T, message: string = "success") {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}
export { ApiResponse };
