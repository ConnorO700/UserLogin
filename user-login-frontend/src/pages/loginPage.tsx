import React, { useState } from 'react';
import login from '../assets/login.png';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import ApiEndpoints from '../endpoints';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function loginPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const { forwardEmail, forwardPassword } = location.state || { forwardEmail: "", forwardPassword: "" };
    const [email, setEmail] = useState(forwardEmail);
    const [password, setPassword] = useState(forwardPassword);

    const handleLogin = async () => {
        const success = await ApiEndpoints.login({ email: email, password: password });
        if (success.token) {
            navigate('/homepage', { state: { id: success.id } });
        }
    }


    return (
        <>
            <div className='page'>
                <div className='flex justify-center items-center w-sm h-1/3 bg-white shadow-xl rounded-xl'>

                    <div className='flex flex-col items-center justify-center mt-auto'>
                        <img className="noSelect" src={login} alt="login"></img>
                        <FormField input={email} setInput={setEmail} label="Email:" />
                        <PasswordField label="Password:" password={password} setPassword={setPassword} />

                        <Link to="/signup" className='link clickable'>create new account?</Link>

                        <div className='noSelect buttonSubmit' onClick={handleLogin}>Login</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default loginPage