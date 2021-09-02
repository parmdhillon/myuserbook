import React from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = ({ callbackHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => callbackHandler(data);

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <form
      className="flex flex-col pt-3 md:pt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col pt-4">
        <label htmlFor="firstName" className="text-lg">
          First Name
        </label>
        <input
          type="text"
          {...register('firstName', {
            required: 'Your First Name is required',
            maxLength: {
              value: 20,
              message: 'Your first name must be less than 20 letters',
            },
            minLength: {
              value: 3,
              message: 'Your first should contain more than 3 letters',
            },
            pattern: {
              value: /^[A-Za-z ]+$/i,
              message: 'Only A-Z letters',
            },
          })}
          placeholder="Parminder"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        <span className="text-red-400">
          {errors.firstName && errors.firstName.message}
        </span>
      </div>
      <div className="flex flex-col pt-4">
        <label htmlFor="lastName" className="text-lg">
          Last Name
        </label>
        <input
          type="text"
          {...register('lastName', {
            required: 'Your Last Name is required',
            maxLength: {
              value: 20,
              message: 'Your last name must be less than 20 letters',
            },
            minLength: {
              value: 3,
              message: 'Your last name should contain more than 3 letters',
            },
            pattern: {
              value: /^[A-Za-z ]+$/i,
              message: 'Only A-Z letters',
            },
          })}
          placeholder="Singh"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        <span className="text-red-400">
          {errors.lastName && errors.lastName.message}
        </span>
      </div>
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
              value: /^[A-Za-z ]+$/i,
              message: 'Only numbers and letters are allowed.',
            },
          })}
          placeholder="yourname"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        <span className="text-red-400">
          {errors.userName && errors.userName.message}
        </span>
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
        <span className="text-red-400">
          {errors.password && errors.password.message}
        </span>
      </div>
      <div className="flex flex-col pt-4">
        <label htmlFor="confirm-password" className="text-lg">
          Confirm Password
        </label>
        <input
          type="password"
          {...register('confirm_password', {
            required: 'Confirm your password',
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
          placeholder="Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        <span className="text-red-400">
          {errors.confirm_password && errors.confirm_password.message}
        </span>
      </div>
      <input
        type="submit"
        value="Register"
        className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
      />
    </form>
  );
};

export default RegisterForm;
