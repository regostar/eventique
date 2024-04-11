import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function Loader({ message }) {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <ThreeDots
        visible={true}
        height='80'
        width='80'
        color='#9333EA'
        ariaLabel='triangle-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
      <p className='text-lg text-center px-2'> {message}</p>
    </div>
  );
}