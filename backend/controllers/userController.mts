import type { Request, Response, NextFunction } from 'express';
import ResponseError from '../middleware/ResponseError.mts';
import jwt from '../util/jwtHandler.mts'
import User from '../models/User.mjs'
import passwordHandler from '../util/passwordHandler.mts';

interface User {
    id: string,
    name: string,
    email: string,
}

interface LoginAttempt {
    email: string,
    password: string
}

function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const newObj = { ...obj };
    for (const key of keys) {
        delete newObj[key];
    }
    return newObj as Omit<T, K>;
}

const trimUser = (user: Pick<User, 'name' | 'email'>) => {
    return { name: user.name.trim(), email: user.email.trim() }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const newUser: Pick<User, 'name' | 'email'> = trimUser(req.body);
    const newUserPassword: string = req.body.password ?? "";
    if (!newUser || (newUser.email.length === 0 || newUserPassword.length === 0 || newUser.name.length === 0)) {
        const error = new ResponseError(400, "request body was missing or incomplete");
        return next(error);
    }
    const userIfAlreadyExists = await User.findOne({ email: newUser.email });

    if (userIfAlreadyExists) {
        const error = new ResponseError(400, "This email is already in use!");
        return next(error);
    }
    const userSecret = passwordHandler.encode(newUserPassword);

    User.create({ ...newUser, hash: userSecret.hash, salt: userSecret.salt });
    res.status(201)
        .json(newUser);
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const login: LoginAttempt = req.body;
    const user = await User.findOne({ email: login.email });
    if (!user) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }

    const hashEqual = passwordHandler.check(login.password, user.hash, user.salt);
    if (!hashEqual) {
        const error = new ResponseError(401, "Unauthorized!");
        return next(error);
    }
    const currentUser: User = { id: user.id, email: user.email, name: user.name }
    const token = jwt.encode(currentUser);
    console.log(hashEqual);
    res.status(200)
        .json({ user: currentUser, token: token })
}

const editUser = async (req: Request, res: Response, next: NextFunction) => {
    const newUser: User = req.body;
    const userToUpdate = await User.findOne({ email: newUser.email });
    if (!userToUpdate) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }
    const updatedUser = await User.findByIdAndUpdate(userToUpdate.id, newUser);

    res.status(200)
        .end();
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body;
    const userToDelete = await User.findOne({ email: user.email });
    if (!userToDelete) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }
    const deletedUser = await User.findByIdAndDelete(userToDelete.id);
    console.log(`DELETED USER:${deletedUser}`)
    res.status(200)
        .end();
}


async function GetUserByEmail(email: string, next: NextFunction) {
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = new ResponseError(404, "No such user exists");
        return next(error);
    }
    return user;
}


const userController = {
    createUser: createUser,
    loginUser: loginUser,
    editUser: editUser,
    deleteUser: deleteUser,
}


export default userController;