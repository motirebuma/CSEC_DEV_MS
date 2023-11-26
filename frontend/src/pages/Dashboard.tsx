import React, { useState, useEffect } from 'react';
import Member from '../components/Member';
import AddMember from '../components/AddMember';
import AddEvent from '../components/AddEvent';
import AllEvents from './AllEvents';
import Message from '../components/Message';
import Loading from '../components/Loading';

type DisplayedContentType = 'allevents' | 'allmembers' | 'addmember' | 'addevent' | 'messages';

const Dashboard: React.FC = () => {
  const [displayedContent, setDisplayedContent] = useState<DisplayedContentType>('allevents');
  const [members, setMembers] = useState<any[]>([]); 
  const [messages, setMessages] = useState<any[]>([]); 
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // token
  const token = localStorage.getItem('token');
  

  // get members
  useEffect(() => {
    fetch('http://localhost:9000/api/members',{
    method: 'GET',
    headers: {
      'Authorization': `${token}`
    }
  }).then(response => response.json())
    .then(membersData => {
      setMembers(membersData);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching members:', error);
    });
  });


  // get messages
  useEffect(() => {
    fetch('http://localhost:9000/api/messages',{
    method: 'GET',
    headers: {
      'Authorization': `${token}`
    }
  })
      .then(response => response.json())
      .then(messageData => {
        setMessages(messageData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  });

  // get reports count
  useEffect(() => {
    fetch('http://localhost:9000/api/get_counts',{
    method: 'GET',
    headers: {
      'Authorization': `${token}`
    }
  })
      .then(response => response.json())
      .then(reportData => {
        setReports(reportData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching members:', error);
      });
  });

  const showContent = (content: DisplayedContentType) => {
    setDisplayedContent(content);
  };

  // logout
  const logout = () => {
    localStorage.removeItem('token'); 
    // window.location.reload();
    window.location.href = '/';
  };
  return (
    <div className='flex flex-col gap-3 bg-[url(/public/b.jpg)] bg-center bg-cover bg-no-repeat min-h-screen px-[20px] py-[30px] items-center justify-center max-sm:px-[10px]'>
      <div className="flex max-sm:flex max-sm:flex-wrap items-center justify-center">
        <div className="flex flex-col gap-5 items-center gmorphism w-[300px] h-[650px] text-white text-xl font-semibold max-sm:w-[95%]">
          {/* Sidebar content */}
          <div className="rounded-full h-[150px] w-[170px] bg-[url(/public/admin.png)] bg-cover bg-center"></div>
          <div className="flex flex-col gap-5">
            <h1 className='font-bold text-3xl'>Dashboard</h1>
            <button onClick={() => showContent('allevents')}>All Events</button>
            <button onClick={() => showContent('allmembers')}>Members</button>
            <button onClick={() => showContent('addmember')}>Add Member</button>
            <button onClick={() => showContent('addevent')}>Add Event</button>
            <button onClick={() => showContent('messages')}>Messages</button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="flex flex-col items-center gmorphism w-[700px] h-[650px] text-white max-sm:w-[95%]">
          <div className='flex flex-wrap gap-3 items-center justify-center py-[20px] overflow-scroll w-full px-[10px]'>
            {displayedContent === 'allevents' && (
              <AllEvents />
            )}

            {displayedContent === 'allmembers' && (
              loading ? <Loading /> :
              members.map(member => (
                <Member key={member.fullname} {...member}/>
              ))
            )} 
            
            {displayedContent === 'addmember' && (
              <AddMember />
            )}

            {displayedContent === 'addevent' && (
              <AddEvent />
            )}
            {displayedContent === 'messages' && (
              loading ? <Loading /> :
              messages.map(message => (
                <Message key={message.id} {...message}/>
              ))
            )} 
          </div>
        </div>

        {/* Reports Section */}
        <div className="flex flex-col gap-5 items-center gmorphism w-[300px] h-[650px] text-white text-xl font-semibold max-sm:w-[95%]">
          <h1 className='font-bold text-3xl'>Reports</h1>
          <div className="flex flex-col gap-5">
            {/* Display reports */}
            { loading ? <Loading /> :
            reports.map(report => (
              <div key={report.name} className="flex justify-between w-[250px] items-center">
                <h1>{report.name}</h1>
                <h1 className='rounded-br border-2 p-1 border-white'>{report.count}</h1>
              </div>
            ))}
          </div>
          <div className="h-[300px] w-[270px] bg-[url(/public/reports.png)] bg-cover bg-center"></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
