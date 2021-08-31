import Head from 'next/head';
import Link from 'next/link';
import RegisterForm from '../components/authForms/registerForm';

export default function RegisterUser() {
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
                My User Book
              </span>
            </div>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-20 px-8 md:px-24 lg:px-32">
              <p className="text-center text-3xl">Register</p>
              <RegisterForm />
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
