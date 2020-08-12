import React from 'react'
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Haja',
            image: 'https://source.unsplash.com/random',
            places: 3
        }
    ];
   return <UsersList items={USERS}/>
}
export default Users
