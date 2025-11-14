import type { Request, Response, NextFunction } from 'express';
import ResponseError from './ResponseError.ts';

const errorHandler = (err : ResponseError, req : Request, res : Response, next : NextFunction) => {
    if (err.statusCode) {
        res.status(err.statusCode).json({ msg: err.message })
    }
    else {
        res.status(500)
            .json({ msg: `${err.message}` })
    }
}

export default errorHandler;