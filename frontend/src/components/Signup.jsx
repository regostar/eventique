import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { isValidEmail, isValidPassword } from '../utils/inputValidations';
import { apiEndpoints } from '../utils/apiEndpoints';

import girlImage from '../assets/login/girl.jpeg'; 
import calendarImage from '../assets/login/calendar.jpeg';

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const inputFieldClass = 'px-4 py-2 rounded-md shadow-md outline-none';

    const handleContinue = async () => {
        if (
            !isValidEmail(email) ||
            !username || 
            !isValidPassword(password) || 
            !isValidPassword(confirmPassword)
            ) 
            {
                setErrorMessage('Invalid field details')
                setTimeout(() => setErrorMessage(''), 3000);
                return;
            }
        else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        let resp = null;

        try
        {
            resp = await axios.post(apiEndpoints.SIGNUP, {
                name: username,
                email,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        catch(error){
            setErrorMessage("Couldn't create account, please try again");
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        if(resp?.data)
        {
            //navigate to homepage if the account has been created 
            // maybe show some msg and store the details in localstorage before navigating
            navigate('/');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center w-1/3 p-2">
                <img src={girlImage} alt='girl thinking' />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-2xl">EVENTIQUE</p>
                <div className='flex'>
                    <p className='text-md'>Create your account</p>
                </div>
                <div className="flex flex-col justify-center m-1">
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className={inputFieldClass}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className={inputFieldClass}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className={inputFieldClass}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            className={inputFieldClass}
                        />
                    </div>
                    <p className='flex justify-center text-red-500 text-m transition-all duration-150 ease-in'>
                        {errorMessage}
                    </p>
                </div>
                <button onClick={handleContinue} className="rounded-md shadow-s hover:shadow-md bg-purple-500 text-white px-4 py-2">
                    Continue
                </button>
                <div className='flex gap-1 text-sm'>
                    <p className=''>Already have an account?</p>
                    <Link to='/login'>
                        <p className='text-gray-400 hover:border-b-2 hover:border-purple-500 px-1 transition-all duration-10'>
                        Login
                        </p>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center items-center w-1/3 p-2">
                <img src={calendarImage} alt='calendar img' />
            </div>
        </div>
    );
};

export default Signup;
