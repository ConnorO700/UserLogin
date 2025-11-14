import react from 'react'
import axios from 'axios'

const baseurl = 'http://localhost:8001'

interface User {
    name: string,
    email: string,
    password: string,
}

const ApiEndpoints = {
    createUser: (body: User) => { return Post(`${baseurl}/api/users/create`, body) },
    login: (body: Omit<User, 'name'>) => { return Post(`${baseurl}/api/users/login`, body) },
    getUserById: (id: number) => { return Get(`${baseurl}/api/users/${id}`) },
}


async function Get(url: string) {
    try {
        var result = await axios.get(url)
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
        var result = await axios.post(url, body)
            .then((response: any) => {
                return response.data;
            })
    }
    catch (error) {
        console.log('Error fetching data: Please double check that API is running and DB connection', error);
    }
    return result;
}

export default ApiEndpoints