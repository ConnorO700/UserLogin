import type { Request, Response, NextFunction } from 'express';
import jwt from '../util/jwtHandler.mts'

const jwtValidator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.slice(7) ?? "";
    if (token) {
        const obj = jwt.decode(token);
        if (obj) {
            req.user = obj;
            next();
        }
        else {
            res.status(401)
                .json({ msg: `Unauthoirized!` })
        }
    }
}

export default jwtValidator;