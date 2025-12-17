import { useContext } from 'react'
import axios from 'axios'
import UserContext from './contexts/UserContext'
import type { ICreateUser, ILoginAttempt, IEmail } from '../../interfaces.mjs'
const baseurl = import.meta.env.VITE_BACKEND_PORT;

const ApiEndpoints = () => {
    const { setCurrentUser, accessToken, setAccessToken } = useContext(UserContext);

    const createUser = (body: ICreateUser) => { return Post(`/api/create`, body) };
    const login = async (body: ILoginAttempt) => {
        const res = await Post(`/api/login`, body);
        await setCurrentUser(res.user);
        await setAccessToken(res.token);
        return res;
    };
    const getAllUsers = () => { return Get(`/api/users/all`) };
    const getUserById = (id: string) => { return Get(`/api/users/single/${id}`) };
    const isEmailUsed = (body: IEmail) => { return Post(`/api/users/email`, body) };
    const deleteUser = (id: string) => { return Delete(`/api/users/single/${id}`) };

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

    async function Delete(url: string) {
        try {
            var result = await axios.delete(`${baseurl}${url}`, {
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
        getAllUsers: getAllUsers,
        getUserById: getUserById,
        isEmailUsed: isEmailUsed,
        deleteUser: deleteUser,
    })


}

export default ApiEndpoints