import React, { useState, useEffect } from 'react';
import Event from '../components/Event'
import Loading from '../components/Loading';

const Archived = () => {
  const [archiveds, setArchiveds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // token
  const token = localStorage.getItem('token'); 

// get upcoming
  useEffect(() => {
    fetch('http://localhost:9000/api/events/archived',{
       method: 'GET',
       headers: {
         'Authorization': `${token}`
       }
     }).then(response => response.json())
      .then(archiveData => {
        setArchiveds(archiveData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  });
  return (
    <div className='flex flex-wrap gap-3 items-center justify-center py-[120px]'>
    {/* Display events */}
       { loading ? <Loading /> : archiveds.map(archived => (
         <Event key={archived.title} {...archived} />
       ))}
    </div>
  )
}

export default Archived
