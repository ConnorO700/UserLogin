import React, { useState } from 'react';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import endpoints from '../endpoints';
import { useNavigate } from 'react-router-dom';
interface User {
  name: string,
  email: string,
  password: string
}

function signupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notSamePasswords, setNotSamePasswords] = useState(false);
  const navagate = useNavigate();
  const clearState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNotSamePasswords(false);
  }

  const handleSubmitClick = () => {
    const IsNotSamePassword = password != confirmPassword;
    setNotSamePasswords(IsNotSamePassword);
    if (!IsNotSamePassword && (name.length != 0 && email.length != 0 && password.length != 0)) {
      endpoints.createUser({ name: name, email: email, password: password })
      navagate('/', {state: {forwardEmail:email, forwardPassword:password}});
      clearState();
    }
  }

  return (
    <div className='page'>
      <div className='flex relative justify-center items-center w-sm h-4/10 shadow-2xl bg-white rounded-xl'>

        <div className='flex flex-col items-center justify-center mt-auto'>
          <div className='absolute noSelect top-2 font-bold text-5xl'>
            Sign up
          </div>
          <FormField input={name} setInput={setName} label="Name:" />
          <FormField input={email} setInput={setEmail} label="Email:" />
          <PasswordField label="Password:" password={password} setPassword={setPassword} error={notSamePasswords} />
          <PasswordField label="Confirm:" password={confirmPassword} setPassword={setConfirmPassword} error={notSamePasswords} />

          <div className='noSelect buttonSubmit' onClick={handleSubmitClick}>Submit</div>
        </div>

      </div>
    </div>
  )
}

export default signupPage