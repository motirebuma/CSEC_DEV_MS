import React from 'react'

type Probs = {
    _id: string
    cover: string
    title: string
    date: string
    time: string
}
const Event = ({_id, cover, title, date, time}: Probs) => {

  return (
    <a href={'/events/' + _id}>
      <div className="flex flex-col gmorphism border-2 w-[300px] text-lg text-white">
        <img src={'http://localhost:9000/' + cover}  alt="event cover" className='h-[300px] w-[600px] rounded-md' />
        <h1>{title}</h1>
        <p className='flex justify-between font-light w-full'>{time} {date}</p>
    </div>
    </a>
  )
}

export default Event
