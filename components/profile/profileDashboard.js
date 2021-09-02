import React, { useEffect, useState } from 'react';
import { getUser } from '../../lib/utils';
import Spinner from '../Spinner/Spinner';
import ProfileAddressCard from './profileAddressCard';
import ProfileInfoCard from './profileInfoCard';

const ProfileDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const userInfo = await getUser(); //get logged in user information and username is taken from JWT Token Cookie
    setUser(userInfo);
    setLoading(!loading);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ProfileInfoCard user={user} />
          <ProfileAddressCard user={user} />
        </>
      )}
    </div>
  );
};

export default ProfileDashboard;
