// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = AuthService.getCurrentUser();
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const login = async (email, password) => {
        const loggedInUser = await AuthService.signin({ email, password });
        setUser(loggedInUser);
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
