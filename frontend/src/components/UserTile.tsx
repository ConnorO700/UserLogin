import { useContext } from 'react'
import type { IUser } from '../../../interfaces.mjs'
import UserContext from '../contexts/UserContext'
import ApiEndpoints from '../endpoints';
function UserTile({ user }: { user: IUser }) {
    const { currentUser } = useContext(UserContext);
    const api = ApiEndpoints();

    const DeleteUser = () => {
        if (user.id) {
            api.deleteUser(user.id);
        }
    }

    function isAdminStyle() {
        return user.role == 'Admin' ? 'bg-amber-100 rounded-sm my-1 px-1 mx-2' : 'bg-white rounded-sm my-1 px-1 mx-2'
    }

    return (
        <>
            <div className='w-200 p-2 m-2 bg-blue-50 hover:bg-blue-200 rounded-lg shadow-lg'>
                <div className='flex justify-between p-1 bg-blue-100 rounded-md'>
                    <div className='pl-1 my-1'>User Id:</div>
                    <div className={isAdminStyle()}>{user.id}</div>
                    <div className='my-1'>Name:</div>
                    <div className={isAdminStyle()}>{user.name}</div>
                    <div className='my-1'>Email:</div>
                    <div className={isAdminStyle()}>{user.email}</div>
                    {currentUser?.role == 'Admin' ? <div className=' hover:bg-red-400 rounded-sm'><div className='bg-red-400 hover:bg-red-200 hover:text-black rounded-full text-white pt-1 text-center w-18 h-8 noSelect ' onClick={DeleteUser}>Delete</div></div> : <></>}
                </div>
            </div>
        </>
    )
}

export default UserTile