import React, { useState, useEffect } from 'react';
import Event from '../components/Event'
import Loading from '../components/Loading';

const Upcoming = () => {
  const [upcomings, setUpcomings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // token
 const token = localStorage.getItem('token'); 

// get upcoming
  useEffect(() => {
    fetch('http://localhost:9000/api/events/upcoming',{
    method: 'GET',
    headers: {
      'Authorization': `${token}`
    }
  }).then(response => response.json())
      .then(upcomingData => {
        setUpcomings(upcomingData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  });
  return (
    <div className='flex flex-wrap gap-3 items-center justify-center py-[120px]'>
    {/* Display events */}
       { loading ? <Loading /> : upcomings.map(upcoming => (
         <Event key={upcoming.title} {...upcoming} />
       ))}
    </div>
  )
}

export default Upcoming
