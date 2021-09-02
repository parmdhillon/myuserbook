import React, { useEffect } from 'react';
import { FaBook } from '@react-icons/all-files/fa/FaBook';
import { HiOutlineLogout } from '@react-icons/all-files/hi/HiOutlineLogout';
import { verifyToken, getCookieToken, signoutUser } from '../lib/utils';
import ProfileDashboard from '../components/profile/profileDashboard';
import Head from 'next/head';

const profile = ({ profile }) => {
  return (
    <>
      <Head>
        <title>Welcome {profile.userName}</title>
      </Head>
      <div className="bg-white min-h-screen flex flex-col">
        <div className="w-full flex justify-between mb-10">
          <div className="flex justify-start pt-12 md:pl-12">
            <span
              className="bg-black text-white font-bold text-xl p-4"
              alt="Logo"
            >
              <FaBook className="inline" /> My User Book
            </span>
          </div>
          <div className="flex justify-end pt-12 md:pr-12">
            <button
              onClick={() => {
                signoutUser();
              }}
              className="bg-red-400 text-white font-bold text-xl p-4 hover:bg-red-500"
            >
              <HiOutlineLogout className="inline" /> Logout
            </button>
          </div>
        </div>
        <ProfileDashboard />
      </div>
    </>
  );
};

export async function getServerSideProps({ req }) {
  const token = getCookieToken(req);
  let profile = verifyToken(token);

  if (!profile) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile,
    },
  };
}

export default profile;
