import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react'
import type { IUser } from '../../../interfaces.mts';
interface IAccessTokenType {
    currentUser: IUser | null,
    setCurrentUser: Dispatch<SetStateAction<IUser | null>>,
    accessToken: string | null,
    setAccessToken: Dispatch<SetStateAction<string>>
}

const AccessTokenContext = createContext<IAccessTokenType>({ currentUser: null, setCurrentUser: () => { }, accessToken: "", setAccessToken: () => { } });

export default AccessTokenContext;