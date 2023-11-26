import React from 'react'
import Hero from './Hero'
import Login from './Login'
import Contactus from './Contactus'

const HomePage = () => {
  
  return (
    <div className='flex flex-col justify-center items-center bg-[url(/public/b.jpg)] bg-no-repeat bg-cover bg-fixed text-white'>
      <Hero />
      <Login />
      <Contactus />
    </div>
  )
}

export default HomePage
