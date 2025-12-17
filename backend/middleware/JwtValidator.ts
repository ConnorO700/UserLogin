import type { Request, Response, NextFunction } from 'express';
import sh from '../util/SecretHandler.mjs'

const jwtValidator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.slice(7) ?? "";
    if (token) {
        const obj = sh.decode(token, false);
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