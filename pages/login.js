import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { FaBook } from '@react-icons/all-files/fa/FaBook';
import LoginForm from '../components/login/loginForm';
import Spinner from '../components/Spinner/Spinner';
import Router from 'next/router';
import LoginErrorCard from '../components/login/loginError';
import { getCookieToken, verifyToken } from '../lib/utils';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleLogin = async (loginInfo) => {
    setLoading((loading) => !loading);
    try {
      await getLogin(loginInfo);
      setLoginStatus(true);
      Router.push('/profile');
    } catch (error) {
      setLoginStatus(false);
      setErrorMessage(error.message);
    }
  };

  const getLogin = async ({ userName, password }) => {
    const loginApi = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    }).catch((error) => {
      throw new Error(error.message || 'Something went wrong!');
      return;
    });
    let result = await loginApi.json();
    if (result.token) {
      Cookies.set('token', result.token);
    } else {
      throw new Error(result.message || 'Something went wrong!');
    }
  };

  const resetLogin = () => {
    setErrorMessage(null);
    setLoginStatus(false);
  };

  return (
    <>
      <Head>
        <title>Login to your Account</title>
      </Head>
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <a href="#" className="bg-black text-white font-bold text-xl p-4">
              <FaBook className="inline" /> My User Book
            </a>
          </div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome.</p>
            {loading ? (
              <Spinner />
            ) : errorMessage ? (
              <LoginErrorCard
                message={errorMessage}
                resetLoginHandler={resetLogin}
              />
            ) : (
              <LoginForm callbackHandler={handleLogin} />
            )}
            <div className="text-center pt-12 pb-12">
              <p>
                Don't have an account?&nbsp;
                <Link href="/">
                  <a className="text-blue-400 underline font-semibold">
                    Register here.
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
          />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ req }) {
  const token = getCookieToken(req);
  let profile = verifyToken(token);

  if (profile) {
    return {
      props: {},
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;
