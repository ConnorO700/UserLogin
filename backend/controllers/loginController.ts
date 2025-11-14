import type { Request, Response, NextFunction } from 'express';
import ResponseError from '../middleware/ResponseError.ts';
interface User {
    id?: number,
    name: string,
    email: string,
    password: string
}

let Users: Array<User> = [
    {
        id: 0, name:"firstuser", email: "admin", password: "1234"
    }
];

const trimUser = (user :User) => {
    return {name: user.name.trim(), email: user.email.trim(), password:user.password} 
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser: User = trimUser(req.body);
    if (!newUser || (newUser.email.length === 0 || newUser.password.length === 0 || newUser.name.length === 0)) {
        const error = new ResponseError(400, "request body was missing or incomplete");
        return next(error);
    }
    if (Users.find(u => u.email === newUser.email)) {
        const error = new ResponseError(400, "This email is already in use!");
        return next(error);
    }

    Users.push({id: Users.length, ...newUser });
    const user = Users[Users.length - 1];
    res.status(201)
        .json(user);
}

const getUser = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const user = Users.find(u => u.id == id)
    if (!user) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }

    res.status(200)
        .json(user);
}

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body;
    
    const index = Users.findIndex(u => u.email == user.email);
    if (index == -1) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }
    if (user.password != Users[index]?.password) {
        const error = new ResponseError(401, "Unauthorized!");
        return next(error);
    }
    const id = Users.find(u => u.email == user.email)?.id;
    res.status(200)
        .json({ id:id, token: "eyASDFGWgsgaeafsghh245628yfbn21br9gfw9h219br9gfh9wsf.2384y98fhn2r0ufhwsfw2f.8u2385hhbbwbiuhbwsfgy8wgebribwf9" })
}

const editUser = (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body;
    const index = Users.findIndex(u => u.email == user.email);
    if (index != -1) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }
    if (user.password != Users[index]?.password) {
        const error = new ResponseError(401, "Unauthorized!");
        return next(error);
    }
    Users[index] = user;
    res.status(200)
        .end();
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body;
    const index = Users.findIndex(u => u.email == user.email);
    if (!index) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }
    if (user.password != Users[index]?.password) {
        const error = new ResponseError(401, "Unauthorized!");
        return next(error);
    }

    Users.splice(index, 1);
    res.status(200)
        .end();
}


const userController = {
    createUser: (req: Request, res: Response, next: NextFunction) => createUser(req, res, next),
    loginUser: (req: Request, res: Response, next: NextFunction) => loginUser(req, res, next),
    getUser: (req: Request, res: Response, next: NextFunction) => getUser(req, res, next),
    editUser: (req: Request, res: Response, next: NextFunction) => editUser(req, res, next),
    deleteUser: (req: Request, res: Response, next: NextFunction) => deleteUser(req, res, next),
}


export default userController;