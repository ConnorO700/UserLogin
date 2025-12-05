import React, { useState } from 'react';
import login from '../assets/login.png';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import ApiEndpoints from '../endpoints';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import type { ChangeEvent } from 'react';

function loginPage() {
    const api = ApiEndpoints();
    const location = useLocation();
    const navigate = useNavigate();
    const { forwardEmail, forwardPassword } = location.state || { forwardEmail: "", forwardPassword: "" };
    const [email, setEmail] = useState(forwardEmail);
    const [password, setPassword] = useState(forwardPassword);

    const handleLogin = async () => {
        const success = await api.login({ email: email, password: password });
        if (success.token) {
            navigate('/homepage', { state: { id: success.user.id } });
        }
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };


    return (
        <>
            <div className='page'>
                <div className='flex justify-center items-center w-sm h-auto bg-white shadow-xl rounded-xl'>

                    <div className='flex flex-col items-center justify-center mt-auto'>
                        <img className="noSelect m-4" src={login} alt="login"></img>
                        <FormField input={email} setInput={setEmail} label="Email:" />
                        <PasswordField label="Password:" password={password} onChange={handlePasswordChange} onKeyDown={handleKeyDown} />

                        <Link to="/signup" className='link clickable'>create new account?</Link>
                        <div className='noSelect buttonSubmit' onClick={handleLogin}>Login</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default loginPage