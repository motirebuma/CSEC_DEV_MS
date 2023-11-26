import React, { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contactus: React.FC = () => {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');


  const sendMessage = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        try {
            const response = await fetch('http://localhost:9000/api/sendmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    subject,
                    message
                }),
            });

            if (response.ok) {
                toast.success('Message sent successfully!',{autoClose: 2000});
                setTimeout(()=> window.location.reload(),2400);
                setFullname('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                toast.error('Unable to send message!');
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

    const handleSubject = (ev: ChangeEvent<HTMLInputElement>) => {
        setSubject(ev.target.value);
    };

    const handleMessage = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(ev.target.value);
    };
  return (
    <div className='flex justify-center items-center h-screen max-sm:w-full' id='contactus'>
      <div className="flex flex-wrap gap-4 gmorphism min-h-[400px] w-[780px] max-sm:w-[95%] rounded-md">
        <form onSubmit={sendMessage} className="flex flex-col gap-3 justify-center w-[330px]">
            <h1 className='text-2xl font-semibold'>Get in touch</h1>
            <p className='font-light'>We're here to assist and eager to hear from you. Let's connect and explore the world of tech together.</p>
            <label htmlFor="fullname" className='font-semibold'>Full name</label>
            <input className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" 
              type="text" 
              id="fullname" 
              placeholder='username' 
              value={fullname}
              onChange={handleFullnameChange}
              required></input>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" 
              type="email" 
              id="email" 
              placeholder='email'
              value={email}
              onChange={handleEmailChange}
              required></input>
            <label htmlFor="subject" className='font-semibold'>Subject</label>
            <input className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" 
              type="text"
              id="subject"  
              placeholder='subject' 
              value={subject}
              onChange={handleSubject}
              required></input>
            <label htmlFor="message" className='font-semibold'>Message</label>
            <textarea className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" 
              id="message"
              placeholder='your message...'
              value={message}
              onChange={handleMessage}
              ></textarea>            
            <button className='w-24 bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block appearance-none leading-normal'>Send</button>
        </form>
        <div className="w-[330px] flex flex-col gap-3 items-center justify-center max-sm:hidden">
            <img src="/contactus.png" alt="login" className='h-96'/>
        </div>
        
      </div>
    </div>
  )
}

export default Contactus
