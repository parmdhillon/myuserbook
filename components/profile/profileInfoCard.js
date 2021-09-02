import React, { useState } from 'react';
import { RiUploadCloudFill } from '@react-icons/all-files/ri/RiUploadCloudFill';
import Spinner from '../Spinner/Spinner';

const ProfileInfoCard = ({ user }) => {
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [loading, setLoading] = useState(false);

  const getProfilePic = async (e) => {
    setLoading((loading) => !loading);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const data = new FormData();
    data.append('profilePic', file);
    const profilePicApi = await fetch('/api/user/uploadProfilePic', {
      method: 'POST',
      body: data,
    }).catch((error) => {
      alert('Something went wrong! Retry');
      console.log(error);
      return;
    });
    let response = await profilePicApi.json();
    if (response.result) {
      setProfilePic(response.result.url);
    } else {
      alert(
        response.message
          ? response.message
          : response.error.message
          ? response.error.message
          : 'Something went wrong!'
      );
    }
    setLoading((loading) => !loading);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-300 to-purple-400 w-full max-w-xl m-6 p-6 shadow-xl">
      <div className=" bg-white h-64 w-full sm:w-5/12 inline-block overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner margin={false} />
          </div>
        ) : !profilePic ? (
          <div className="w-full h-full flex justify-center items-center flex-col">
            <img src="/img/man.png" width="100px" />
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              onChange={getProfilePic}
              accept="image/png, image/jpeg"
            />
            <label
              htmlFor="imageUpload"
              className="bg-black px-5 py-2 mt-5 text-white hover:bg-gray-700"
            >
              <RiUploadCloudFill className="inline" /> Upload Photo
            </label>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center flex-col">
            <img src={profilePic} width="150px" />
          </div>
        )}
      </div>
      <div className="bg-purple-200 w-full sm:w-7/12 h-64 inline-block overflow-hidden">
        <div className="flex justify-center items-start flex-col h-full pl-10">
          <div>
            <span className="block font-bold text-3xl text-purple-600">
              {user.firstName}
            </span>
            <span className="font-semibold text-xl text-gray-500">
              {user.lastName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
