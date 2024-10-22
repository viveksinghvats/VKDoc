import React from 'react';
import { Link } from 'react-router-dom';

const PreHome = () => {
    return (
        <div className="home-container">
            <header className="header">
                <h1>Welcome to VKDOC</h1>
                <p>Your collaborative document editor for real-time editing and sharing.</p>
            </header>
            <main className="content">
                <section className="intro">
                    <h2>About VKDOC</h2>
                    <p>
                        VKDOC is a powerful, cloud-based document editing and sharing platform where you can
                        create, edit, and collaborate with others in real-time.
                        We’ve got you covered with robust editing tools and seamless sharing options.
                    </p>
                </section>

                <div className="cta-buttons">
                    <Link to="/signup" className="cta-button signup-button">Sign Up</Link>
                    <Link to="/signin" className="cta-button signin-button">Sign In</Link>
                </div>
            </main>
        </div>
    );
};

export default PreHome;
