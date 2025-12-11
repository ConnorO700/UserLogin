import React from 'react'
import type { ChangeEvent } from 'react';

interface IComponentProps {
    label: string,
    input: string,
    error?: boolean,
    setInput: React.Dispatch<React.SetStateAction<string>>,
}

function FormField({ label, input, error = false, setInput }: IComponentProps) {
    const styles = error ? 'textInputBoxError' : 'textInputBox'
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className={styles}>
            <div className='textInputLabel noSelect'>{label}</div>
            <input value={input} onChange={handleChange} className='textInput'></input>
        </div>
    )
}

export default FormField