import React, { useState, useEffect } from 'react';
import EditPopup from '../components/EditMemberPopup';
import ChangePassword from '../components/ChangePassword';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import Upcoming from './Upcoming';
import Archived from './Archived';
import AllEvents from './AllEvents';

type DisplayedContentType = 'allevents' | 'upcoming' | 'archived' | 'myaccount';


interface UserData {
  _id: string
  fullname?: string;
  email?: string;
  department?: string;
  gender?: string;
  year?: string;
}

interface CustomJwtPayload extends JwtPayload {
  role: string;
  email: string;
  memberId: string;
  fullname: any;
  department: string;
  gender: string;
  year: string;
}

const Home = () => {
  
  const [displayedContent, setDisplayedContent] = useState<DisplayedContentType>('allevents');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

  const handleChangePassowrdClick = () => {
    setShowChangePasswordPopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  const handleClosePopup2 = () => {
    setShowChangePasswordPopup(false);
  };



  // get member id from token
  const token = localStorage.getItem('token');
  let _id='';

  if(token){
    const decodedToken = jwtDecode(token) as CustomJwtPayload;
    _id = decodedToken.memberId;    
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/member/${_id}`,{
          method: 'GET',
          headers: {
            'Authorization': `${token}`
          }
      });
        const data = await response.json();

        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();

  });

  const showContent = (content: DisplayedContentType) => {
    setDisplayedContent(content);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // logout
  const logout = () => {
    localStorage.removeItem('token'); 
    // window.location.reload();
    window.location.href = '/';
  };
  return (
    <div className='flex flex-wrap gap-3 bg-[url(/public/b.jpg)] bg-center bg-cover bg-no-repeat min-h-screen px-[20px] bg-fixed items-center justify-center max-sm:px-[10px]'>
      <div className='flex font-semibold w-[90%] h-16  gmorphism text-white items-center fixed top-10 z-50 mx-auto'>
      <div className='flex items-center w-full justify-between'>
        <h1 className='text-2xl font-semibold'>CSEC_DEV</h1>
      <div className="md:flex md:items-center text-lg md:justify-between">
        <div className="md:hidden relative">
          <button onClick={toggleMenu} className="flex items-center justify-center w-8 h-8">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 gmorphism border rounded-md shadow-lg z-10 w-[200px]">
              <button onClick={() => showContent('allevents')} className="block py-2 px-4 ">All-Events</button>
              <button onClick={() => showContent('upcoming')} className="block py-2 px-4">Upcoming</button>
              <button onClick={() => showContent('archived')} className="block py-2 px-4">Archived</button>
              <button onClick={() => showContent('myaccount')} className="block py-2 px-4 ">My Account</button>
              <button onClick={logout} className="block py-2 px-4">Logout</button>
            </div>
          )}
        </div>
        {/* pc screens */}
        <div className="hidden md:flex gap-3 items-center justify-end text-lg">
          <button onClick={() => showContent('allevents')}>All-Events</button>
          <button onClick={() => showContent('upcoming')}>Upcoming</button>
          <button onClick={() => showContent('archived')}>Archived</button>
          <button onClick={() => showContent('myaccount')}>My Account</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      </div>
    </div>


        {displayedContent === 'allevents' && (
          <div className='py-[100px]'>
            <AllEvents />
          </div>
        )}
        
        {displayedContent === 'upcoming' && (
          <Upcoming />
        )}

        {displayedContent === 'archived' && (
          <Archived />
        )}
        {displayedContent === 'myaccount' && (
          <div className="flex gap-3 gmorphism w-[700px] p-[40px] items-center">
              <div className="flex flex-col gap-2 w-[320px] font-semibold text-white text-lg">
                  <h1 className='text-3xl font-bold'>My Account</h1>
                  <h1>Full Name: {userData?.fullname}</h1>
                  <h1>Email: {userData?.email}</h1>
                  <h1>Department: {userData?.department}</h1>
                  <h1>Gender: {userData?.gender}</h1>
                  <h1>Year: {userData?.year}</h1>
                  <div className="flex gap-3">
                      <button onClick={handleEditClick} className='text-[17px] w-44 bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block appearance-none leading-normal'>Edit info</button>
                      <button onClick={handleChangePassowrdClick} className='text-[17px] w-96 bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block appearance-none leading-normal'>Change password</button>
                  </div>
                  {showEditPopup && (
                    <EditPopup handleClose={handleClosePopup} _id={userData?._id ? userData?._id : ''} oldfullname={userData?.fullname ? userData?.fullname : ''} oldemail={userData?.email ? userData?.email : ''} olddepartment={userData?.department ? userData?.department : ''} oldyear={userData?.year ? userData?.year : ''} oldgender={userData?.gender ? userData?.gender : ''} />
                  )}
                  {showChangePasswordPopup && (
                    <ChangePassword handleClose={handleClosePopup2}/>
                  )}
              </div>
              <div className="right w-[320px] max-sm:hidden">
                  <img src="/boy.png" alt="" />
              </div>
         </div>
        )}    
    </div>
  )
}

export default Home
