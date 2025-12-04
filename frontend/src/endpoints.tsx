import { useState, useContext } from 'react'
import axios from 'axios'
import AccessTokenContext from './contexts/AccessTokenContext'

const baseurl = import.meta.env.VITE_BACKEND_PORT;

interface User {
    name: string,
    email: string,
    password: string,
}


const ApiEndpoints = () => {
    const { accessToken, setAccessToken } = useContext(AccessTokenContext);
    const createUser = (body: User) => { return Post(`/api/create`, body) };
    const login = async (body: Omit<User, 'name'>) => {
        const res = await Post(`/api/login`, body);
        console.log(`setting Token: ${res.token}`);
        await setAccessToken(res.token);
        return res;
    };
    const getUserById = (id: string) => { return Get(`/api/users/${id}`) };

    async function Get(url: string) {
        try {
            console.log(`using token: ${accessToken}`);
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
            console.log(`using token: ${accessToken}`);
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
    })


}

export default ApiEndpoints