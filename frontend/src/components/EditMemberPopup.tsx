import React, { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Probs ={
    _id: string
    oldfullname: string
    oldemail: string
    olddepartment: string
    oldgender: string
    oldyear: string
    handleClose: any
}


const EditPopup = ({handleClose, _id, oldfullname, oldemail, olddepartment, oldgender, oldyear}:Probs) => {
  
  const [fullname, setFullname] = useState<string>(oldfullname);
  const [email, setEmail] = useState<string>(oldemail);
  const [department, setDepartment] = useState<string>(olddepartment);
  const [gender, setGender] = useState<string>(oldgender);
  const [year, setYear] = useState<string>(oldyear);

  const editMemberPopup = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        // token
        const token = localStorage.getItem('token'); 

        try {
            const response = await fetch('http://localhost:9000/api/editmember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    _id: _id,
                    newFullname: fullname,
                    newEmail: email,
                    newDepartment: department,
                    newGender: gender,
                    newYear: year,
                }),
            });

            if (response.ok) {
                toast.success('Member info edited!',{autoClose: 2000});
                setTimeout(()=> window.location.reload(),2400);
                setFullname('');
                setEmail('');
                setDepartment('');
                setGender('');
                setYear('');
            } else {
                toast.error('Unable to edit member!');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const handleFullnameChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setFullname(ev.target.value);
    };

    const handleEmailChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value);
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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={editMemberPopup} className="flex flex-col gap-2 gmorphism p-6 rounded-lg shadow-lg relative ">
        <button onClick={handleClose} className="absolute top-2 right-2 text-sm text-white cursor-pointer border-[px] bg-red-500 p-2 rounded-full w-[40px] h-[40px]">
          X
        </button>
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
        <button className="bg-[#010101] text-white py-2 px-4 rounded hover:bg-[#42cdf6]">Save</button>
      </form>
    </div>
  );
};

export default EditPopup;
