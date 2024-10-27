// src/App.js
import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { isTokenExpired, clearUserData } from './helpers/authHelper';
import SignupPage from './components/Signup';
import SigninPage from './components/Signin';
import EditorPage from './components/Editor';
import Local from '../src/utils/local';
import PreHome from './components/PreHome';
import Header from './components/Header';
import DocumentsPage from './components/Documents';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/signin" />;
};
const PreHomeRoute = () => {
    const user = Local.getloggedInUser();
    if (user) {
        return <DocumentsPage />
    } else {
        return <PreHome />
    }

}

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const token = localStorage.getItem('token');
            if (isTokenExpired(token)) {
                clearUserData();
                navigate("/signin");  // Redirect to login if token is expired
            }
        }, 1 * 60 * 1000); // Check every 1 minutes

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [history]);

    return (
        <div>
            <Outlet />
        </div>
    );
}

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'signup', // Relative path; no leading /
                element: <SignupPage />
            },
            {
                path: 'signin', // Relative path; no leading /
                element: <SigninPage />
            },
            {
                path: 'editor/:documentId',
                element: <PrivateRoute><EditorPage /></PrivateRoute>
            },
            // Optional: Add a default route
            {
                path: '/',
                element: <PreHomeRoute /> // Redirect to signin or another page
            },
            {
                path: '/documents',
                element: <PreHomeRoute />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthProvider><RouterProvider router={appRouter} /></AuthProvider>);
