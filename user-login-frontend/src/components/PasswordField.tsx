import React from 'react'
import type { ChangeEvent } from 'react';
interface ComponentProps {
    label: string,
    password: string,
    error?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function PasswordField({ label, password, error = false, onChange=()=>{} }: ComponentProps) {
    const styles = error ? 'textInputBoxError shaking-element' : 'textInputBox'
  

    return (
        <div className={styles}>
            <div className='textInputLabel noSelect'>{label}</div>
            <input type='password' className='textInput' onChange={onChange} value={password} ></input>
        </div>
    )
}

export default PasswordField