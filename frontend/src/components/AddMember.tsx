import React, { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMember: React.FC = () => {
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [year, setYear] = useState<string>('');

    const addMember = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        // token
        const token = localStorage.getItem('token');        
        try {
            const response = await fetch('http://localhost:9000/api/addmember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    password,
                    department,
                    gender,
                    year,
                }),
            });

            if (response.ok) {
                toast.success('New member added!',{autoClose: 2000});
                setTimeout(()=> window.location.reload(),2400);
                setFullname('');
                setEmail('');
                setPassword('');
                setDepartment('');
                setGender('');
                setYear('');
            } else {
                toast.error('Unable to add member!');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    const handleFullnameChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setFullname(ev.target.value);
    };

    const handleEmailChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value);
    };

    const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setPassword(ev.target.value);
    };

    const handleDepartmentChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setDepartment(ev.target.value);
    };

    const handleGenderChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setGender(ev.target.value);
    };

    const handleYearChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setYear(ev.target.value);
    };

    return (
        <form onSubmit={addMember} className="flex flex-col gap-2 justify-center w-[600px]">
            <h1 className='text-4xl font-semibold py-2'>Add new member</h1>
            <label htmlFor="fullname" className='font-semibold'>Full name</label>
            <input
                value={fullname}
                onChange={handleFullnameChange}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                id="fullname"
                placeholder='fullname'
                required
            />
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input
                value={email}
                onChange={handleEmailChange}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="email"
                id="email"
                placeholder='email'
                required
            />
            <label htmlFor="password" className='font-semibold'>Password</label>
            <input
                value={password}
                onChange={handlePasswordChange}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="password"
                id="password"
                placeholder='password'
                required
            />
            <label htmlFor="department" className='font-semibold'>Department</label>
            <input
                value={department}
                onChange={handleDepartmentChange}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                id="department"
                placeholder='department'
                required
            />
            <label htmlFor="gender" className='font-semibold'>Gender</label>
            <input
                value={gender}
                onChange={handleGenderChange}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                id="gender"
                placeholder='gender'
                required
            />
            <label htmlFor="year" className='font-semibold'>Year</label>
            <input
                value={year}
                onChange={handleYearChange}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                id="year"
                placeholder='year'
                required
            />
            <button type='submit' className='w-36 bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block appearance-none leading-normal'>Add Member</button>
        </form>
    );
};

export default AddMember;
