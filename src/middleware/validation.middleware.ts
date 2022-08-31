import e, { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function ValidationMiddleware(schema: Joi.Schema): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      const validatedBody = await schema.validateAsync(
        req.body,
        validationOptions
      );
      req.body = validatedBody;
      next();
    } catch (err: any) {
      const errors: string[] = [];
      err.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });
      res.status(400).send({ code: 400, success: false, messages: errors });
    }
  };
}

export default ValidationMiddleware;
