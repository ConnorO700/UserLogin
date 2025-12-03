import type { ChangeEvent, KeyboardEvent } from 'react';
interface ComponentProps {
    label: string,
    password: string,
    error?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onSelect?: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
}

const b = () => {};

function PasswordField({ label, password, error = false, onChange = b, onSelect = b, onKeyDown = b }: ComponentProps) {
    const styles = error ? 'textInputBoxError shaking-element' : 'textInputBox'


    return (
        <div className={styles}>
            <div className='textInputLabel noSelect'>{label}</div>
            <input type='password' className='textInput' onChange={onChange} onSelect={onSelect} onKeyDown={onKeyDown} value={password} ></input>
        </div>
    )
}

export default PasswordField