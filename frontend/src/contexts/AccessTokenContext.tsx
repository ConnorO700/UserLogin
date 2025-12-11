import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react'
interface IAccessTokenType {
    accessToken: string | null,
    setAccessToken: Dispatch<SetStateAction<string>>
}

const AccessTokenContext = createContext<IAccessTokenType>({ accessToken: "", setAccessToken: () => { } });

export default AccessTokenContext;