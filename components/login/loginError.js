import Link from 'next/link';
import React from 'react';
import { FaRedoAlt } from '@react-icons/all-files/fa/FaRedoAlt';

const LoginErrorCard = ({ message, resetLoginHandler }) => {
  return (
    <div className="my-6 text-center w-full border-2 border-gray-400 rounded-2xl p-10 shadow-xl">
      <span className="block text-3xl mb-5 text-red-400 font-medium">
        Login Failed!
      </span>
      <p>
        <b>Error:</b> {message || 'Something went wrong!'}
      </p>
      <button
        onClick={() => resetLoginHandler()}
        className="block bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 w-full"
      >
        <FaRedoAlt className="inline" /> Retry Login
      </button>
    </div>
  );
};

export default LoginErrorCard;
