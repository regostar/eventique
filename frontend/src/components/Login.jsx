import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import girlImage from '../assets/login/girl.jpeg';
import calendarImage from '../assets/login/calendar.jpeg';

import {apiEndpoints} from '../utils/apiEndpoints'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputFieldClass = 'px-4 py-2 rounded-md shadow-md outline-none';

  const handleSignIn = async () => {
    const resp = await axios.post(apiEndpoints.LOGIN, {
      email,
      password
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // if successful navigate to home page
  }

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
              className={inputFieldClass}
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex justify-center items-center'>
            <input
              type='password'
              className={inputFieldClass}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-center items-center'>
            <button
              type='button'
              className='flex justify-center align-center rounded-md text-white bg-purple-500 hover:shadow-md p-2'
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
          <div className='flex justify-center p-2'>
            <div className='flex gap-1 text-sm'>
              <p className=''>Don't have an account?</p>
              <Link to='/signup'>
                <p className='text-gray-400 hover:border-b-2 hover:border-purple-500 px-1 transition-all duration-10'>
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
