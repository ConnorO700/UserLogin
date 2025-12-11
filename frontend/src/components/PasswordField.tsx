import type { ChangeEvent, KeyboardEvent } from 'react';
interface IComponentProps {
    label: string,
    password: string,
    error?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onSelect?: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
}

const b = () => {};

function PasswordField({ label, password, error = false, onChange = b, onSelect = b, onKeyDown = b }: IComponentProps) {
    const styles = error ? 'textInputBoxError' : 'textInputBox'

    return (
        <div className={styles}>
            <div className='textInputLabel noSelect'>{label}</div>
            <input type='password' className='textInput' onChange={onChange} onSelect={onSelect} onKeyDown={onKeyDown} value={password} ></input>
        </div>
    )
}

export default PasswordField