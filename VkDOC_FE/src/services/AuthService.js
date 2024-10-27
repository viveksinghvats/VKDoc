import { BASEURL } from "../utils/constants";

const authService = {
    /**
     * Login function that sends email and password to the backend,
     * stores user data and token in localStorage if successful.
     */
    signin: async (email, password) => {
        try {
            const response = await fetch(`${BASEURL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                const errorMessage = errorData.msg || 'Login failed'; // Get message from backend or fallback to default
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Store the user and token in localStorage or sessionStorage
            localStorage.setItem('user', JSON.stringify(data.user)); // User info
            localStorage.setItem('token', data.token); // JWT or token
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    /**
     * Get the current user from localStorage (or sessionStorage).
     * Returns null if no user is logged in.
     */
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null; // Parse user object if it exists
    },

    /**
     * Logout function that clears the user data and token from localStorage.
     */
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },

    /**
     * Register function for new users (similar to login, but API is usually different).
     */
    signup: async (email, password, name) => {
        try {
            const response = await fetch(`${BASEURL}/auth/signup`, {
                method: 'POST',
                body: JSON.stringify({ email, password, name }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                const errorMessage = errorData.msg || 'Registration failed'; // Get message from backend or fallback to default
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Optionally, store the user and token after successful registration
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    /**
     * Check if a user is authenticated (helper method).
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('token'); // Returns true if token exists
    },
};

export default authService;
