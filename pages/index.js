import { FaBook } from '@react-icons/all-files/fa/FaBook';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import RegisterForm from '../components/registration/registerForm';
import RegisterStatus from '../components/registration/registerStatus';
import Spinner from '../components/Spinner/Spinner';

export default function RegisterUser() {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); //to check if user is registering
  const [registerResults, setRegisterResults] = useState(false); //to store results of registering i.e; success or failure
  const errorMessage = useRef(null); //stores any error message from API
  const fullName = useRef(null); //stores User's Name after successfull registration

  const handleRegistration = async (userData) => {
    setLoading((loading) => !loading);
    try {
      const result = await createUser(userData);
      fullName.current = result.data.fullName;
      setRegisterResults(true);
    } catch (error) {
      errorMessage.current = error.message;
    }
    setIsRegistered((isRegistered) => !isRegistered);
    setLoading((loading) => !loading);
  };

  async function createUser(userData) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }

    return data;
  }

  return (
    <>
      <Head>
        <title>My User Book</title>
      </Head>
      <div className="bg-white h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
              <span
                className="bg-black text-white font-bold text-xl p-4"
                alt="Logo"
              >
                <FaBook className="inline" /> My User Book
              </span>
            </div>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-20 px-8 md:px-24 lg:px-32">
              <p className="text-center text-3xl">Register</p>
              {loading ? (
                <Spinner cssClass="my-36" />
              ) : !isRegistered ? (
                <RegisterForm callbackHandler={handleRegistration} />
              ) : (
                <RegisterStatus
                  status={registerResults}
                  message={errorMessage.current}
                  fullName={fullName.current}
                />
              )}
              <div className="text-center pt-12 pb-12">
                <p>
                  Already have an account?&nbsp;
                  <Link href="/login">
                    <a className="underline font-semibold text-blue-500">
                      Log in here.
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 shadow-2xl">
            <img
              className="object-cover w-full h-screen hidden md:block"
              src="https://source.unsplash.com/AZtMXheXnWc"
              alt="Background"
            />
          </div>
        </div>
      </div>
    </>
  );
}
