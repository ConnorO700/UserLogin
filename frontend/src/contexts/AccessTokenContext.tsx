import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react'
interface AccessTokenType {
    accessToken: string | null,
    setAccessToken: Dispatch<SetStateAction<string>>
}

const AccessTokenContext = createContext<AccessTokenType>({ accessToken: "", setAccessToken: () => { } });

export default AccessTokenContext;