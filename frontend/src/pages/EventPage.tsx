import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import EditEventPopup from '../components/EditEvent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface CustomJwtPayload extends JwtPayload {
  role: string;
}
const EventDetails = () => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] =useState(true);
  const { _id }: any = useParams(); // Using useParams hook from react-router-dom

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/event/${_id}`,{
          method: 'GET',
          headers: {
            'Authorization': `${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const eventData = await response.json();
        setEvent(eventData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        // Handle the error, show a message, redirect, etc.
      }
    };

    fetchEvent();
  });

  const handleBack = () => {
    window.history.back();
  };

  const token = localStorage.getItem('token');
  let role;
    if (token) {
        const decodedToken = jwtDecode(token) as CustomJwtPayload;
       role = decodedToken.role;
    }

// edit event
const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
  };


  const handClosePopup = () => {
    setShowEditPopup(false);
  };


// delete event
  async function deleteEvent() {
    try {
      const response = await fetch('http://localhost:9000/api/delete_event', {
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
        toast.success('Event deleted',{autoClose: 2000});
        setTimeout(()=> window.location.href = '/admin_dashboard',2400);
      }
      else{
        toast.error('Unable to delete event');
      }

    } catch (error) {
        toast.error('Something went wrong!');
    }
  }
  return (
    <div className='flex flex-col  gap-3 bg-[url(/public/b.jpg)] bg-center bg-cover bg-no-repeat min-h-screen px-[20px] py-[30px] items-center justify-center max-sm:px-[10px]'>
      
      
        <div className="gmorphism w-[80%] text-white text-lg flex flex-col gap-2">
{loading ? <Loading /> :
        <>
        <button onClick={handleBack} className='absolute top-2 right-2 text-sm text-white cursor-pointer border-[px] bg-red-500 p-2 rounded-full w-[40px] h-[40px]'>X</button>
        <div className="p-2 w-full">
            <img src={'http://localhost:9000/'+event?.cover} alt="" className='w-full h-96 bg-cover'/>
        </div>
        <h1 className='text-2xl font-semibold'>{event?.title}</h1>
        <div className="flex w-full justify-between bg-[#010101] p-1">
            <h1>{event?.time}</h1>
            <h1>{event?.date}</h1>
        </div>
        <p>{event?.description}</p>
        </>
     }
     { role==='admin' ? 
        <div className='flex w-full justify-between'>
             {showEditPopup && <EditEventPopup handleClose={handClosePopup} _id={event?._id} oldtime={event?.time} oldtitle={event?.title} olddescription={event?.description}  olddate={event?.date}/>}
            <button onClick={handleEditClick} className='px-4 py-2 bg-[#42cdf6] text-white rounded hover:bg-[#42ccf6cb]'>Edit</button>
            <button onClick={deleteEvent} className='px-4 py-2 bg-[#e42787] text-white rounded hover:bg-[#e42785c9]'>Delete</button>
        </div>
        :
        <div></div>
      }
      </div>      
    </div>
  );
};

export default EventDetails;
