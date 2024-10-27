import { jwtDecode } from 'jwt-decode';

export const clearUserData = async () => {
    localStorage.removeItem('token');   // Clear token
    localStorage.removeItem('user');    // Clear any user-specific data
};

// Check if token is expired
export const isTokenExpired = token => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const expiry = decoded.exp * 1000;  // `exp` is in seconds; convert to milliseconds
    return Date.now() > expiry;
};
