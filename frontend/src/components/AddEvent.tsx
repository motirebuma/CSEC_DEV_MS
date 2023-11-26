import React, { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEvent: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [files, setFiles] = useState<FileList | null>(null); // Use FileList for file input

    const addEvent = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        // token
        const token = localStorage.getItem('token');

        const _data = new FormData();
        _data.set('title', title);
        _data.set('time', time);
        _data.set('date', date);
        _data.set('description', description);
        if (files) _data.set('file', files[0]);

        const response = await fetch(
            'http://localhost:9000/api/addevent',{
                method: 'POST',
                body: _data,
                credentials: 'include',
                headers: {
                  'Authorization': `${token}`
                }
            });

        if (response.ok) {
            toast.success('Event created successfully!',{autoClose: 2000});
            setTimeout(()=> window.location.reload(),2400);
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
        <form onSubmit={addEvent} className="flex flex-col gap-3 justify-center w-[600px]">
            <h1 className='text-4xl font-semibold py-2'>Add Event</h1>
            <label htmlFor="title" className='font-semibold'>Title</label>
            <input
                onChange={handleTitleChange}
                value={title}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                id="title"
                placeholder='title'
                required
            />
            <label htmlFor="description" className='font-semibold'>Description</label>
            <input
                onChange={handleDescriptionChange}
                value={description}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                id="description"
                placeholder='description'
                required
            />
            <label htmlFor="file" className='font-semibold'>Cover image</label>
            <input
                onChange={handleFileChange}
                accept="image/*"
                type="file"
                id="file"
                placeholder='description'
                required
            />
            <label htmlFor="date" className='font-semibold'>Date</label>
            <input
                onChange={handleDateChange}
                value={date}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="date"
                id="date"
                placeholder='date'
                required
            />
            <label htmlFor="time" className='font-semibold'>Time</label>
            <input
                onChange={handleTimeChange}
                value={time}
                className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
                type="time"
                id="time"
                placeholder='time'
                required
            />
            <button className='w-36 bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block appearance-none leading-normal'>Add Event</button>
        </form>
    )
}

export default AddEvent;
