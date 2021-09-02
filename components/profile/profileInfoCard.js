import React from 'react';
import { RiUploadCloudFill } from '@react-icons/all-files/ri/RiUploadCloudFill';

const ProfileInfoCard = ({ user }) => {
  const getProfilePic = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('profilePic', file);
    const profilePicApi = await fetch('/api/user/uploadProfilePic', {
      method: 'POST',
      body: data,
    }).catch((error) => {
      throw new Error(error.message || 'Something went wrong!');
      return;
    });
    let result = await profilePicApi.json();
    if (result.profilePicUrl) {
      console.log(result);
    } else {
      //alert(result.message || 'Something went wrong!');
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-300 to-purple-400 w-full max-w-xl m-6 p-6 shadow-xl">
      <div className=" bg-white h-64 w-5/12 inline-block overflow-hidden">
        {user.profilePic ? (
          ''
        ) : (
          <>
            <div className="w-full h-full flex justify-center items-center flex-col">
              <img src="/img/man.png" width="100px" />
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                onChange={getProfilePic}
              />
              <label
                htmlFor="imageUpload"
                className="bg-black px-5 py-2 mt-5 text-white hover:bg-gray-700"
              >
                <RiUploadCloudFill className="inline" /> Upload Photo
              </label>
            </div>
          </>
        )}
      </div>
      <div className="bg-purple-200 w-7/12 h-64 inline-block overflow-hidden">
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
