import React, { useState } from 'react';
import './styles/AuthForm.css';
import authService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';


const Signup = ({ }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errorMsg, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.signup(formData.email, formData.password, formData.name);
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button type="submit" className="btn">Sign Up</button>
                    </form>
                </div>
            </div>
            {errorMsg ? (<div>
                <p className='errorMsg'>{errorMsg}</p>
            </div>) : ''}
        </div>
    );
};

export default Signup;
