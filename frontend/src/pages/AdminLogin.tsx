import React, { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handUsernameChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setUsername(ev.target.value);
  };
  const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
      setPassword(ev.target.value);
  };

  const adminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/api/admin-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Store the token in local storage
        localStorage.setItem('token', token);

        // Redirect to UserDashboard upon successful login
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
    <div className='flex justify-center items-center flex-col gap-3 bg-[url(/public/b.jpg)] text-white bg-center bg-cover bg-no-repeat min-h-screen' id='login'>
      <div className="flex flex-wrap gap-4 gmorphism min-h-[400px] w-[780px] max-sm:w-[90%]">
        <div className="w-[330px] flex flex-col gap-3 max-sm:hidden">
          <img src="/admin.png" alt="cover" className='h-96' />
        </div>
        <div className="flex flex-col gap-3 justify-center w-[330px]">
          <h1 className='text-2xl font-semibold'>Admin</h1>
          <p className='font-light'>Welcome back admin!</p>
          <form onSubmit={adminLogin} className='flex flex-col gap-2 text-white'>
            <label htmlFor="username" className='font-semibold'>Usernamer</label>
            <input
              className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              id="username"
              placeholder='username'
              value={username}
              onChange={handUsernameChange}
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

export default AdminLogin;

