import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

export default function ErrorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = error.statusCode;
  const message = error.message;

  res
    .status(statusCode)
    .send({ code: statusCode, messages: [message], errorLog: error.errorLog });
}
