import React from 'react'
import type { ChangeEvent } from 'react';
interface ComponentProps {
    label: string,
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    error?: boolean,
}

function PasswordField({ label, password, setPassword, error = false}: ComponentProps) {
    const styles = error ? 'textInputBoxError shaking-element': 'textInputBox'
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className={styles}>
            <div className='textInputLabel noSelect'>{label}</div>
            <input type='password' className='textInput' onChange={handlePasswordChange} value={password} ></input>
        </div>
    )
}

export default PasswordField