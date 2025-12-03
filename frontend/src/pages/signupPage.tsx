import React, { useState } from 'react';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import ApiEndpoints from '../endpoints';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent } from 'react';

function signupPage() {
  const api = ApiEndpoints();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [samePasswords, setSamePasswords] = useState(true);

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?~]/;

  const [passwordHas12, setPasswordHas12] = useState(false);
  const [passwordHasLower, setPasswordHasLower] = useState(false);
  const [passwordHasUpper, setpasswordHasUpper] = useState(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasSpecial, setPasswordHasSpecial] = useState(false);
  const [passwordTips, setPasswordTips] = useState(true);
  const submitConditions = (
    email.length != 0 &&
    password.length != 0 &&
    name.length != 0 &&
    password == confirmPassword &&
    passwordHas12 &&
    passwordHasLower &&
    passwordHasUpper &&
    passwordHasNumber &&
    passwordHasSpecial
  );
  const navagate = useNavigate();
  const clearState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSamePasswords(true);
  }

  const handleSubmitClick = () => {
    if (submitConditions) {
      api.createUser({ name: name, email: email, password: password })
      navagate('/', { state: { forwardEmail: email, forwardPassword: password } });
      clearState();
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmitClick();
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setSamePasswords(pass === confirmPassword)
    setPassword(pass);
    setPasswordHas12(pass.length > 11);
    setPasswordHasLower(lowercaseRegex.test(pass));
    setpasswordHasUpper(uppercaseRegex.test(pass));
    setPasswordHasNumber(numberRegex.test(pass));
    setPasswordHasSpecial(specialCharRegex.test(pass));
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setSamePasswords(password === pass);
    setConfirmPassword(pass);
  }

  const accepted = (val: boolean): string => {
    return val ? "text-green-500" : "text-red-500";
  }

  return (
    <div className='page'>
      <div className='flex relative justify-center items-center w-sm h-auto shadow-2xl bg-white rounded-xl'>

        <div className='flex flex-col items-center justify-center mt-auto'>
          <div className='noSelect m-2 font-bold text-5xl'>
            Sign up
          </div>
          <FormField input={name} setInput={setName} label="Name:" />
          <FormField input={email} setInput={setEmail} label="Email:" />
          <PasswordField label="Password:" password={password} error={!samePasswords} onChange={handlePasswordChange} onSelect={() => { setPasswordTips(false) }} />
          <PasswordField label="Confirm:" password={confirmPassword} error={!samePasswords} onChange={handleConfirmPasswordChange} onKeyDown={handleKeyDown} />
          <div hidden={passwordTips} className='w-xs border-1 text-center border-gray-300 rounded-xl shadow-lg'>
            <div>{`Your password must contain:`}</div>
            <div className={accepted(passwordHas12)}>{`At least 12 characters`}</div>
            <div className={accepted(passwordHasLower)}>{`Lower case letters (a-z)`}</div>
            <div className={accepted(passwordHasUpper)}>{`Upper case letters (A-Z)`}</div>
            <div className={accepted(passwordHasNumber)}>{`Numbers (0-9)`}</div>
            <div className={accepted(passwordHasSpecial)}>{`Special characters`}</div>
          </div>

          <div className='noSelect buttonSubmit' onClick={handleSubmitClick}>Submit</div>
        </div>

      </div>
    </div>
  )
}

export default signupPage