import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPopup from './EditMemberPopup';

type Props = {
  _id: any;
  fullname: any;
  email: any;
  department: any;
  gender: any;
  year: any;
};

const Member: React.FC<Props> = ({_id, fullname, email, department, gender, year}: Props) => {
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  // delete member
  async function deleteMember() {
    // token
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:9000/api/delete_member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          _id,
        }),
        credentials: 'include',
      });

      if(response.ok){
        toast.success('Member deleted!',{autoClose: 2000});
        setTimeout(()=> window.location.reload(),2400);
      }
      else{
        toast.error('Unable to delete member');
      }

    } catch (error) {
        toast.error('Something went wrong!');
      // toast.error('Error deleting product');
    }
  }

  return (
    <div className='flex border-[1px] rounded-md w-full h-[60px] items-center justify-between p-2'>
      <h1>{fullname}</h1>
      <h1>{email}</h1>
      <h1>{department}</h1>
      <h1>{gender}</h1>
      <h1>{year}</h1>

      <button
        onClick={handleEditClick}
        className='px-4 py-2 bg-[#42cdf6] text-white rounded hover:bg-[#42ccf6cb]'
      >Edit</button>

      <button
        onClick={deleteMember}
        className='px-4 py-2 bg-[#e42787] text-white rounded hover:bg-[#e42785c9]'
      >Delete</button>

      {/* Render the EditPopup component conditionally */}
      {showEditPopup && <EditPopup handleClose={handleClosePopup} _id={_id} oldfullname={fullname} oldemail={email} olddepartment={department} oldyear={year} oldgender={gender} />}
    </div>
  );
};

export default Member;
