import { useState } from 'react'
import axios from 'axios'

const baseurl = import.meta.env.VITE_BACKEND_PORT;

interface User {
    name: string,
    email: string,
    password: string,
}

const ApiEndpoints = () => {
    const [token, setToken] = useState<string>("");
    const createUser = (body: User) => { return Post(`${baseurl}/api/create`, body) };
    const login = async (body: Omit<User, 'name'>) => {
        const res = await Post(`${baseurl}/api/login`, body);
        setToken(res.token);
        return res;
    };
    const getUserById = (id: number) => { return Get(`${baseurl}/api/users/${id}`) };

    async function Get(url: string) {
        try {
            var result = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
            var result = await axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
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