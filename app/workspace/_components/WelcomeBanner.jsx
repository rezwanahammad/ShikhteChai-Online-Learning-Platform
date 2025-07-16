import React from 'react';

function WelcomeBanner() {
  return (
    <div className='p-6 md:p-10 rounded-xl shadow-lg bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white text-center animate-fade-in'>
      <h2 className='text-2xl md:text-3xl font-extrabold mb-2 drop-shadow'>
        Welcome to ShikteChai
      </h2>
      <p className='text-base md:text-lg font-medium opacity-90'>
        Your one-stop solution for all your learning needs.
      </p>
    </div>
  );
}

export default WelcomeBanner;
