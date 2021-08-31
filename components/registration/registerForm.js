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
        <label htmlFor="name" className="text-lg">
          Name
        </label>
        <input
          type="text"
          {...register('fullName', {
            required: 'Your Name is required',
            maxLength: {
              value: 20,
              message: 'Your name must be less than 20 letters',
            },
            pattern: {
              value: /^[A-Za-z ]+$/i,
              message: 'Only A-Z letters',
            },
          })}
          placeholder="Parminder Singh"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        <span className="text-red-400">
          {errors.fullName && errors.fullName.message}
        </span>
      </div>
      <div className="flex flex-col pt-4">
        <label htmlFor="email" className="text-lg">
          Email
        </label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Enter a valid Email address',
            },
          })}
          placeholder="email@parmcodes.com"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        <span className="text-red-400">
          {errors.email && errors.email.message}
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
