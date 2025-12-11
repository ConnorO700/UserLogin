import { useState, useContext } from 'react'
import axios from 'axios'
import AccessTokenContext from './contexts/AccessTokenContext'
import type { ICreateUser, ILoginAttempt, IEmail } from '../../interfaces.mjs'
const baseurl = import.meta.env.VITE_BACKEND_PORT;

const ApiEndpoints = () => {
    const { accessToken, setAccessToken } = useContext(AccessTokenContext);
    const createUser = (body: ICreateUser) => { return Post(`/api/create`, body) };
    const login = async (body: ILoginAttempt) => {
        const res = await Post(`/api/login`, body);
        await setAccessToken(res.token);
        return res;
    };
    const getUserById = (id: string) => { return Get(`/api/users/${id}`) };
    const isEmailUsed = (body: IEmail) => { return Post(`/api/users/email`, body) }

    async function Get(url: string) {
        try {
            var result = await axios.get(`${baseurl}${url}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    return response.data;
                })
        }
        catch (error) {
            console.log('Error fetching data: Please double check that API is running and DB connection', error);
        }
        return result;
    }

    async function Post(url: string, body: any) {
        try {
            var result = await axios.post(`${baseurl}${url}`, body, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    return response.data;
                })
        }
        catch (error) {
            console.log('Error fetching data: Please double check that API is running and DB connection', error);
        }
        return result;
    }

    return ({
        createUser: createUser,
        login: login,
        getUserById: getUserById,
        isEmailUsed: isEmailUsed,
    })


}

export default ApiEndpoints