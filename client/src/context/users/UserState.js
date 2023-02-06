import { useState } from 'react';
import UserContext from './UserContext';

const UserState = (props) => {
    // for development
    // const host = 'http://localhost:80';

    const [userName, setUserName] = useState('dummy');


    // Fetch

    const fetchUserDetails = async () => {

        // Fetching User : Backend

        const response = await fetch(`api/auth/fetchUserDetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();

        // Fetching User : Frontend

        setUserName(json);
    }

    return (
        <UserContext.Provider value={{ fetchUserDetails, userName }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;