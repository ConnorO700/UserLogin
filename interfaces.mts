interface IUserLite {
    id?: string,
    name: string,
    email: string
}


export interface IUser extends IUserLite {
    password?: string,
    role: string,
    hash?: string,
    salt?: string
}

export interface ICreateUser extends Omit<IUserLite,'id'> {
    password: string
}


export interface ILoginAttempt {
    email: string,
    password: string
}

export interface IEmail {
    email: string
}

declare global {
  namespace Express {
    // Extend the Request interface
    export interface Request {
      user: IUser; // Add an optional 'user' property of type User
    }
  }
}