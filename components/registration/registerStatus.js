import React from 'react';
import { FaRedoAlt } from '@react-icons/all-files/fa/FaRedoAlt';
import { FaSignInAlt } from '@react-icons/all-files/fa/FaSignInAlt';

const RegisterStatus = ({ status, message, fullName }) => {
  return (
    <div className="my-6 text-center w-full border-2 border-gray-400 rounded-2xl p-10 shadow-xl">
      {status ? (
        <>
          <span className="block text-3xl mb-5 text-green-400 font-medium">
            Registration Successful!
          </span>
          <p>
            <b className="text-gray-500">{fullName}</b> now, you can login with
            your credentials
          </p>
          <button className="bg-black w-full text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
            <FaSignInAlt className="inline" /> Login
          </button>
        </>
      ) : (
        <>
          <span className="block text-3xl mb-5 text-red-400 font-medium">
            Registration Failed!
          </span>
          <p>
            <b>Error:</b> {message || 'Something went wrong!'}
          </p>
          <a
            href="/"
            className="block bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 w-full"
          >
            <FaRedoAlt className="inline" /> Retry Signing Up
          </a>
        </>
      )}
    </div>
  );
};

export default RegisterStatus;
