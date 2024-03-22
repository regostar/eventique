import React, { useState } from 'react';
import girlImage from '../assets/login/girl.jpeg'; 
import calendarImage from '../assets/login/calendar.jpeg';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory hook
// import { unstable_HistoryRouter } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const history = unstable_HistoryRouter(); // Initialize useHistory hook

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleContinue = () => {
        // Check if all fields are filled
        if (email && username && password) {
            // Redirect to LoginSignup page
            // history.push('/'); // Redirect to LoginSignup page
            navigate('/');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="signup-container">
            <h1>Create your account</h1>
            {/* <img src={leftImage} alt="Left Image" className="left-image" />
            <img src={rightImage} alt="Right Image" className="right-image" /> */}
        
            <div className="input-container">
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="text"
                    placeholder="User Name"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button onClick={handleContinue}>Continue</button>
            <div className="login-link">
                Already have an account? <Link to="/">Log in</Link>
            </div>
        </div>
    );
};

export default Signup;
