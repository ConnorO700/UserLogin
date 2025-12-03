import React from 'react'
import type { ChangeEvent } from 'react';

interface ComponentProps {
    label: string,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
}

function FormField({ label, input, setInput }: ComponentProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className='textInputBox'>
            <div className='textInputLabel noSelect'>{label}</div>
            <input value={input} onChange={handleChange} className='textInput'></input>
        </div>
    )
}

export default FormField