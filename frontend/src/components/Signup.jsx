import React, { useState } from 'react';
import girlImage from '../assets/login/girl.jpeg'; 
import calendarImage from '../assets/login/calendar.jpeg';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrorMessage('');
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setErrorMessage('');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrorMessage('');
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setErrorMessage('');
    };

    const handleContinue = () => {
        if (!email || !username || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        // Additional validation, e.g., email format, password strength
        // Redirect to login/signup page
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center w-1/3 p-2">
                <img src={girlImage} alt='girl thinking' />
            </div>
            <div className="flex flex-col justify-start items-center gap-2">
            <p className="text-4xl font-bold">EVENTIQUE</p>
                <h1 className="text-2xl">Create your account</h1>
                <div className="input-container">
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={handleEmailChange}
                            className="px-4 py-2 rounded-md shadow-md border-none"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="px-4 py-2 rounded-md shadow-md border-none"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="px-4 py-2 rounded-md shadow-md border-none"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="px-4 py-2 rounded-md shadow-md border-none"
                        />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <button onClick={handleContinue} className="rounded-md shadow-s hover:shadow-md bg-purple-500 text-white px-4 py-2">
                    Continue
                </button>
                <div className="login-link">
                    Already have an account? <Link to="/">Log in</Link>
                </div>
            </div>
            <div className="flex justify-center items-center w-1/3 p-2">
                <img src={calendarImage} alt='calendar img' />
            </div>
        </div>
    );
};

export default Signup;
