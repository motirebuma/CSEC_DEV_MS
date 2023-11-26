import React, { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleEmailChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
      setPassword(ev.target.value);
  };

  const userLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Store the token in local storage
        localStorage.setItem('token', token);

        window.location.href = '/admin_dashboard';
        
      } else {
        // Handle unsuccessful login
        toast.error('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen' id='login'>
      <div className="flex flex-wrap gap-4 gmorphism min-h-[400px] w-[780px] max-sm:w-[90%] rounded-md">
        <div className="w-[330px] flex flex-col gap-3 max-sm:hidden">
          <img src="/boy.png" alt="cover" />
        </div>
        <div className="flex flex-col gap-3 justify-center w-[330px]">
          <h1 className='text-2xl font-semibold'>Sign in</h1>
          <p className='font-light'>Welcome back to CSEC DEV Club! Log in to continue your journey in tech innovation and collaboration</p>
          <form onSubmit={userLogin} className='flex flex-col gap-3'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input
              className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="password" className='font-semibold'>Password</label>
            <input
              className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
              type="password"
              id="password"
              name="password"
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type='submit'
              className='w-24 bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block appearance-none leading-normal'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

