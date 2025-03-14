import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../models/customError';

function handleErrors(
    err: CustomError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const statusCode = 'status' in err ? err.status : 500;
    res.status(statusCode).send(err.message);
}

export { handleErrors };
