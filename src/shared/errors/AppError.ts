class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly origin: string;

  constructor(message: string, statusCode = 400, origin: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.origin = origin;
  }
}

export default AppError;
