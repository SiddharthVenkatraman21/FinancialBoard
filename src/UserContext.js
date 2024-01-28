// UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './components/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState(null);

    useEffect(() => {
        if (user) {
            setUid(user.uid);
        } else {
            setUid(null);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ uid, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};
