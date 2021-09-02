import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ callbackHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => callbackHandler(data);

  return (
    <form
      className="flex flex-col pt-3 md:pt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col pt-4">
        <label htmlFor="userName" className="text-lg">
          Username
        </label>
        <input
          type="text"
          {...register('userName', {
            required: 'Username is required',
            maxLength: {
              value: 20,
              message: 'Your Username must be less than 20 letters',
            },
            minLength: {
              value: 3,
              message: 'Your Username should contain more than 3 letters',
            },
            pattern: {
              value: /^[A-Za-z0-9 ]+$/i,
              message: 'Only numbers and letters are allowed.',
            },
          })}
          placeholder="username..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex flex-col pt-4">
        <label htmlFor="password" className="text-lg">
          Password
        </label>
        <input
          type="password"
          {...register('password', {
            required: 'You must specify a password',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
            maxLength: {
              value: 30,
              message: 'Password must not exceed 30 characters',
            },
          })}
          placeholder="Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <input
        type="submit"
        value="Log In"
        className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
      />
    </form>
  );
};

export default LoginForm;
