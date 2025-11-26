import type { Request, Response, NextFunction } from 'express';
import ResponseError from './ResponseError.mts';
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new ResponseError(404, 'Not Found');
	next(error);
}

export default notFound;