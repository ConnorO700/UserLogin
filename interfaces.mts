interface IUserLite {
    id: string,
    name: string,
    email: string
}


export interface IUser extends IUserLite {
    role?: string,
    password?: string,
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