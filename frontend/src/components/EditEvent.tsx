import React, { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Probs ={
    _id: string
    oldtitle: string
    olddescription: string
    oldtime: string
    olddate: string
    handleClose: any
}


const EditEventPopup = ({handleClose, _id, oldtitle, olddescription, oldtime, olddate}:Probs) => {
  
    const [title, setTitle] = useState<string>(oldtitle);
    const [description, setDescription] = useState<string>(olddescription);
    const [time, setTime] = useState<string>(oldtime);
    const [date, setDate] = useState<string>(olddate);
    const [files, setFiles] = useState<FileList | null>(null);

  const editEventPopup = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        // token
        const token = localStorage.getItem('token');

        const _data = new FormData();
        _data.set('_id', _id);
        _data.set('title', title);
        _data.set('time', time);
        _data.set('date', date);
        _data.set('description', description);
        if (files) _data.set('file', files[0]);

        const response = await fetch(
            'http://localhost:9000/api/edit_event',
            {
                method: 'POST',
                body: _data,
                credentials: 'include',
                headers: {
                  'Authorization': `${token}`
                }
            }
        );

        if (response.ok) {
            toast.success('Event edited successfully!',{autoClose: 2000});
            setTimeout(()=> window.location.reload(),2400);
        }
        else {
            toast.error('something went wrong');
        }
    };

   const handleTitleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setTitle(ev.target.value);
    };

    const handleDescriptionChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setDescription(ev.target.value);
    };

    const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files) {
            setFiles(ev.target.files);
        }
    };

    const handleDateChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setDate(ev.target.value);
    };

    const handleTimeChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setTime(ev.target.value);
    };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={editEventPopup} className="flex flex-col gap-2 gmorphism p-6 rounded-lg shadow-lg relative ">
        <button onClick={handleClose} className="absolute top-2 right-2 text-sm text-white cursor-pointer border-[px] bg-red-500 p-2 rounded-full w-[40px] h-[40px]">
          X
        </button>
        <label htmlFor="title" className='font-semibold'>Title</label>
            <input
                onChange={handleTitleChange}
                value={title}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                id="title"
                placeholder='title'
            />
            <label htmlFor="description" className='font-semibold'>Description</label>
            <input
                onChange={handleDescriptionChange}
                value={description}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                id="description"
                placeholder='description'
            />
            <label htmlFor="file" className='font-semibold'>Cover image</label>
            <input
                onChange={handleFileChange}
                accept="image/*"
                type="file"
                id="file"
                placeholder='description'
            />
            <label htmlFor="date" className='font-semibold'>Date</label>
            <input
                onChange={handleDateChange}
                value={date}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="date"
                id="date"
                placeholder='date'
            />
            <label htmlFor="time" className='font-semibold'>Time</label>
            <input
                onChange={handleTimeChange}
                value={time}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="time"
                id="time"
                placeholder='time'
            />
        <button className="bg-[#010101] text-white py-2 px-4 rounded hover:bg-[#42cdf6]">Save</button>
      </form>
    </div>
  );
};

export default EditEventPopup;
