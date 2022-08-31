class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public errorLog: string;

  constructor(statusCode: number, message: string, errorLog: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errorLog = errorLog;
  }
}

export default HttpException;
