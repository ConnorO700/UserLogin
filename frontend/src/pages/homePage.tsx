import { useState, useEffect } from 'react';
import ApiEndpoints from '../endpoints';
import { Link } from 'react-router-dom';
import UserTileList from '../components/UserTileList'
import type { IUser } from '../../../interfaces.mjs'

function homePage() {
    const api = ApiEndpoints();
    const [users, setUsers] = useState<IUser[]>([]);

    const fetchUsers = async () => {
        const res = await api.getAllUsers();
        setUsers(res);
    }

    return (
        <>
            <div className='page'>
                <div className='bg-white w-1/2 h-2/3 shadow-lg rounded-xl'>
                    <div className='flex flex-col items-center justify-center mt-auto'>
                        <div className='noSelect buttonSubmit' onClick={fetchUsers}>Show Users</div>
                        <UserTileList users={users} />
                        <Link to="/" className='noSelect buttonEdit'>Logout</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default homePage