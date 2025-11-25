import type { Request, Response, NextFunction } from 'express';
import jwt from '../util/jwtHandler.tsx'

const jwtValidator = (req: Request, res: Response, next: NextFunction) => {
    console.log("jwt middleware");
    const token = req.token;
    if (token) {
        const obj = jwt.decode(token);
        if (obj) {
            next();
        }
        else {
            res.status(401)
                .json({ msg: `Unauthoirized!` })
        }
    }
}

export default jwtValidator;