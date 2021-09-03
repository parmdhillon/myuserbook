import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { useForm } from 'react-hook-form';

const ProfileAddressCard = ({ user }) => {
  const [address, setAddress] = useState(user.address);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(async () => {
    if (!address) {
      return;
    }
    setLoading((loading) => !loading);
    const response = await fetch('/api/user/getCords', {
      method: 'POST',
      body: JSON.stringify({ address }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const { result } = await response.json();
      const { lat, log, mapBoxToken } = result;
      if (lat && log && mapBoxToken) {
        setMap(
          `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${log},${lat},13.52,0/600x330?access_token=${mapBoxToken}`
        );
      }
    }
    setLoading((loading) => !loading);
  }, [address]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (address) => {
    setLoading((loading) => !loading);
    try {
      const data = await updateAddress(address);
      if (data.result.address) {
        setAddress(data.result.address);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
    setLoading((loading) => !loading);
  };

  async function updateAddress(data) {
    const response = await fetch('/api/user/updateAddress', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }
    return result;
  }
  return (
    <div className=" rounded-2xl w-full max-w-xl m-6 p-6 shadow-xl border-2 border-opacity-20">
      {loading ? (
        <Spinner />
      ) : !address ? (
        <>
          <h3 className="text-2xl font-bold">Your Address 📌</h3>
          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col pt-4">
              <label htmlFor="street" className="text-lg">
                Street Address
              </label>
              <input
                type="text"
                {...register('street', {
                  required: 'Street Address is required',
                  maxLength: {
                    value: 50,
                    message: 'Street Address should not exceed 50 letters',
                  },
                  minLength: {
                    value: 3,
                    message:
                      'Street Address should contain more than 3 letters',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9 ]+$/i,
                    message: 'Only numbers and letters are allowed.',
                  },
                })}
                placeholder="street..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="text-red-400">
                {errors.street && errors.street.message}
              </span>
            </div>
            <div className="w-full pt-4 flex">
              <div className="w-1/2 flex flex-col pr-4">
                <label htmlFor="city" className="text-lg">
                  City
                </label>
                <input
                  type="text"
                  {...register('city', {
                    required: 'City name is required',
                    minLength: {
                      value: 3,
                      message: 'City name must have at least 3 characters',
                    },
                    maxLength: {
                      value: 40,
                      message: 'City name must not exceed 30 characters',
                    },
                  })}
                  placeholder="city..."
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-400">
                  {errors.city && errors.city.message}
                </span>
              </div>
              <div className="w-1/2 flex flex-col pl-4">
                <label htmlFor="state" className="text-lg">
                  State / Province
                </label>
                <input
                  type="text"
                  {...register('state', {
                    required: 'State/Province name is required',
                    minLength: {
                      value: 2,
                      message:
                        'State/Province name must have at least 2 characters',
                    },
                    maxLength: {
                      value: 40,
                      message:
                        'State/Province name must not exceed 30 characters',
                    },
                  })}
                  placeholder="state/province..."
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-400">
                  {errors.state && errors.state.message}
                </span>
              </div>
            </div>{' '}
            <div className="w-full pt-4 flex">
              <div className="w-1/2 flex flex-col pr-4">
                <label htmlFor="country" className="text-lg">
                  Country
                </label>
                <input
                  type="text"
                  {...register('country', {
                    required: 'Country name is required',
                    minLength: {
                      value: 3,
                      message: 'Country name must have at least 3 characters',
                    },
                    maxLength: {
                      value: 40,
                      message: 'Country name must not exceed 50 characters',
                    },
                  })}
                  placeholder="country..."
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-400">
                  {errors.country && errors.country.message}
                </span>
              </div>
              <div className="w-1/2 flex flex-col pl-4">
                <label htmlFor="state" className="text-lg">
                  Postal Code
                </label>
                <input
                  type="text"
                  {...register('postal', {
                    maxLength: {
                      value: 8,
                      message: 'Postal Code must not exceed 8 characters',
                    },
                  })}
                  placeholder="postal..."
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-400">
                  {errors.postal && errors.postal.message}
                </span>
              </div>
            </div>
            <input
              type="submit"
              value="Save Address"
              className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
            />
          </form>
        </>
      ) : map ? (
        <>
          <div
            style={{
              maxWidth: '600px',
              height: '300px',
              backgroundImage: `url('${map}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="flex justify-center items-center"
          >
            <div className="rounded-full w-3 h-3 bg-blue-600 animate-ping	flex justify-center items-center">
              <div className="rounded-full w-3 h-3 bg-blue-600 animate-ping	"></div>
            </div>
          </div>
          <div className="mt-5 text-center">{address && address}</div>
        </>
      ) : (
        <>
          <p className="my-5">Map not available!</p>
          <div className="mt-5 text-center">{address && address}</div>
        </>
      )}
    </div>
  );
};

export default ProfileAddressCard;
