import React from 'react'
import type { IUser } from '../../../interfaces.mjs'

import UserTile
    from './UserTile'
function TileList({ users }: { users: IUser[] }) {
    return (
        <>
            <div className='bg-blue-100 rounded-lg shadow-lg'>
                {users.map((user: IUser) =>
                    <UserTile user={user} />
                )}
            </div>
        </>
    )
}

export default TileList