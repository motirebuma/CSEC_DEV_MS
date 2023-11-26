import React, { useState, FormEvent, ChangeEvent } from 'react';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomJwtPayload extends JwtPayload {
  memberId: string;
}

const ChangePassword = ({handleClose}:any) => {
  
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const changePassword = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        let _id;
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token) as CustomJwtPayload;
          _id = decodedToken.memberId;
        }
        
        try {
            const response = await fetch('http://localhost:9000/api/changepassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    _id: _id,
                    newPassword: newPassword,
                    oldPassword: oldPassword,
                    confirmPassword: confirmPassword,

                }),
            });

            if (response.status === 200) {
                toast.success('Password changed successfully',{autoClose: 2000});
                setTimeout(()=> window.location.reload(),2400);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
            else if (response.status === 400) {
                toast.error('password missmatch');
            }
            else if (response.status === 401) {
                toast.error('Wrong password');
            }
             else {
                toast.error('Unable to change password');
            }
        } catch (error) {
                toast.error('Unable to change password');
        }
    };

    const handleOldPassword = (ev: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(ev.target.value);
    };

    const handleNewPassword = (ev: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(ev.target.value);
    };

    const handleConfirmPassword = (ev: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(ev.target.value);
    };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={changePassword} className="flex flex-col gap-2 gmorphism p-6 rounded-lg shadow-lg relative ">
        <button onClick={handleClose} className="absolute top-2 right-2 text-sm text-white cursor-pointer border-[px] bg-red-500 p-2 rounded-full w-[40px] h-[40px]">
          X
        </button>
        <label htmlFor="oldpassword" className='font-semibold'>Old password</label>
            <input
                value={oldPassword}
                onChange={handleOldPassword}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="password"
                id="oldpassword"
                placeholder='old password'
                required
            />
            <label htmlFor="newpassword" className='font-semibold'>New password</label>
            <input
                value={newPassword}
                onChange={handleNewPassword}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="password"
                id="newpassword"
                placeholder='new password'
                required
            />
            <label htmlFor="confirm" className='font-semibold'>Confirm password</label>
            <input
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="password"
                id="confirm"
                placeholder='confirm password'
                required
            />
        <button className="bg-[#010101] text-white py-2 px-4 rounded hover:bg-[#42cdf6]">Save</button>
      </form>
    </div>
  );
};

export default ChangePassword;
