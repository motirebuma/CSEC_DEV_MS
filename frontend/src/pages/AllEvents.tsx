import React, { useState, useEffect } from 'react';
import Event from '../components/Event'
import Loading from '../components/Loading';

const AllEvents = () => {
  const [events, setAllevents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // token
  const token = localStorage.getItem('token'); 

// get upcoming
  useEffect(() => {
    fetch('http://localhost:9000/api/events',{
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        }
    }).then(response => response.json())
      .then(events => {
        setAllevents(events);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  });
  return (
    <div className='flex flex-wrap gap-3 items-center justify-center py-[20px]'>
    {/* Display events */}
       { loading ? <Loading /> : events.map(event => (
         <Event key={event.title} {...event} />
       ))}
    </div>
  )
}

export default AllEvents
