import React from 'react';
import { useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

function UserProfile() {

    const user = useSelector(store => store.user);

    return( 
        <div>
        <h1>Your Profile</h1>
        <h2>UserName: {user.username}</h2>
        <h2>Email: {user.email}</h2>
        <h3>Phone Number: {user.phone_number}</h3>
        <LogOutButton />
        </div>
    )
}

export default UserProfile;