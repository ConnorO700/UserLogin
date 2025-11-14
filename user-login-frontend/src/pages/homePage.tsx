import React, { useState, useEffect } from 'react';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import ApiEndpoints from '../endpoints';
import { Link, useLocation } from 'react-router-dom';

interface User {
    name: string,
    email: string,
    password: string,
}

function homePage() {
    const loction = useLocation();
    const { id } = loction.state || 0;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        const fetchUser = async () => {
            const user = await ApiEndpoints.getUserById(id);
            console.log(id);
            console.log(user);
            if (user) {
                setName(user.name);
                setEmail(user.email);
                setPassword(user.password);
            }
        }
        fetchUser();
    }, []);


    return (
        <>
            <div className='page'>
                <div className='bg-white w-1/2 h-2/3 shadow-lg rounded-xl'>
                    <div className='flex flex-col items-center justify-center mt-auto'>
                        <FormField input={name} setInput={setName} label="Name:" />
                        <FormField input={email} setInput={setEmail} label="Email:" />
                        <PasswordField label="Password:" password={password} setPassword={setPassword} />
                        <div className='noSelect buttonEdit'>Edit User</div>
                        <div className='noSelect buttonDelete'>Delete User</div>
                        <Link to="/" className='noSelect buttonSubmit'>Logout</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default homePage