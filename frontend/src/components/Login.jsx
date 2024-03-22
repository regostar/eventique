import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import girlImage from '../assets/login/girl.jpeg'; 
import calendarImage from '../assets/login/calendar.jpeg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    // Implement sign in functionality here using username and password
    // Write the authentication code for user name password entered and link to Dashboard page
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex justify-center items-center w-1/3 p-2'>
          <img src={girlImage} alt='girl thinking' />
        </div>
        <div className='flex flex-col justify-start items-center gap-2'>
          <p className='text-2xl'>EVENTIQUE</p>
          <div className='flex '>
            <p className='text-md'>Sign up or Login to continue</p>
          </div>
          <div className='flex justify-center items-center'>
            <input
              type='text'
              className='px-4 py-2 rounded-md shadow-md border-none'
              placeholder='Username'
            />
          </div>
          <div className='flex justify-center items-center'>
            <input
              type='password'
              className='px-4 py-2 rounded-md shadow-md border-none'
              placeholder='Password'
            />
          </div>
          <div className='flex justify-center items-center'>
            <button className='rounded-md shadow-s hover:shadow-md p-2 '>
              Sign in
            </button>
          </div>
          <div className='flex justify-center p-2'>
            <div className='flex gap-1 text-sm'>
              <p className=''>Don't have an account?</p>
              <Link to='/signup'>
                <p className='text-gray-400 hover:shadow-md hover:text-purple-400'>
                  Create account
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center w-1/3 p-2'>
          <img src={calendarImage} alt='calendar img' />
        </div>
      </div>
    </>
  );
}
