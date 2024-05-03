import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

import girlImage from '../assets/login/girl.jpeg';
import calendarImage from '../assets/login/calendar.jpeg';

import { apiEndpoints } from '../utils/apiEndpoints';
import { isValidEmail, isValidPassword } from '../utils/inputValidations';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [wrongCreds, setWrongCreds] = useState(false);
  const navigate = useNavigate();

  const inputFieldClass = 'px-4 py-2 rounded-md shadow-md outline-none';
  let errorMessage = '';

  if (isInvalid) errorMessage = 'please fill all the details';
  else if (wrongCreds) errorMessage = 'invalid email or password';

  const handleSignIn = async () => {
    if (!isValidEmail(email) || !isValidPassword(password)) {
      setIsInvalid(true);
      //turn it off after some time
      setTimeout(() => {
        setIsInvalid(false);
      }, 3000);

      return;
    }
    let resp = null;
    try {
      resp = await axios.post(
        apiEndpoints.LOGIN,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {}

    if (resp?.data) {
      const id = resp.data?.id;
      const csrf = Cookies.get('csrftoken');
      console.log("csrf = ", csrf);
      localStorage.setItem('authToken', resp.data?.key);
      
      localStorage.setItem('USER_ID', id);
      localStorage.setItem('CSRF_TOKEN', csrf);
      navigate('/');
    } else {
      setWrongCreds(true);
      setTimeout(() => {
        setWrongCreds(false);
      }, 3000);
    }
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

          <p className='text-red-500 text-lg transition-all duration-150 ease-in'>
            {errorMessage}
          </p>

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
