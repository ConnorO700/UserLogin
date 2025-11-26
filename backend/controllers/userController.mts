import type { Request, Response, NextFunction } from 'express';
import ResponseError from '../middleware/ResponseError.mts';
import jwt from '../util/jwtHandler.mts'
import User from '../models/User.mjs'

interface User {
    id?: number,
    name: string,
    email: string,
    roles?: string[],
    password: string,
}

type publicUser = Omit<User, 'email' | 'password'>;

interface LoginAttempt {
    email: string,
    password: string
}

let Users: Array<User> = [
    {
        id: 0, name: "firstuser", email: "admin", password: "1234", roles: []
    },
    {
        id: 1, name: "connor", email: "Connor700@gmail.com", password: "Hoplogin9387!", roles: []
    }
];

function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const newObj = {...obj};
    for (const key of keys){
        delete newObj[key];
    }
    return newObj as Omit<T, K>;
}

const trimUser = (user: Pick<User, 'name' | 'email' | 'password'>) => {
    return { name: user.name.trim(), email: user.email.trim(), password: user.password }
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser: Pick<User, 'name' | 'email' | 'password'> = trimUser(req.body);
    if (!newUser || (newUser.email.length === 0 || newUser.password.length === 0 || newUser.name.length === 0)) {
        const error = new ResponseError(400, "request body was missing or incomplete");
        return next(error);
    }
    if (Users.find(u => u.email.toLocaleLowerCase() === newUser.email.toLocaleLowerCase())) {
        const error = new ResponseError(400, "This email is already in use!");
        return next(error);
    }

    User.create({...newUser})
    Users.push({ id: Users.length, ...newUser, roles: [] });
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

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    res.status(200)
        .json(Users);
}

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    const login: LoginAttempt = req.body;

    const index = Users.findIndex(u => u.email.toLocaleLowerCase() == login.email.toLocaleLowerCase());
    if (index == -1) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }
    if (login.password != Users[index]?.password) {
        const error = new ResponseError(401, "Unauthorized!");
        return next(error);
    }

    const user: publicUser = omit(Users[index],['email', 'password'] );

    //const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    const token = jwt.encode(user);

    res.status(200)
        .json({ user: user, token: token })
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
    createUser: createUser,
    loginUser: loginUser,
    getUser: getUser,
    getAll: getAllUsers,
    editUser: editUser,
    deleteUser: deleteUser,
}


export default userController;