import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-wrap justify-center items-center h-screen min-h-[500px]'>
      <div className="flex flex-wrap gap-4 gmorphism min-h-[500px] w-[900px] max-sm:w-[95%] rounded-md">
        <div className="flex justify-between items-center w-full">
          <a href="/" className='text-3xl font-semibold max-sm:text-xl'>CSEC_DEV</a>
          <div className="flex gap-3 text-lg font-light items-center">
            <a href="#contactus" className='hover:underline'>Contact-Us</a>
            <a href="#login" className='bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-18 appearance-none leading-normals'>Login</a>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <div className="w-[50%] flex flex-col gap-3 max-sm:w-[100%]">
            <h1 className='text-4xl font-semibold'>Building Tomorrow's Tech Leaders: Welcome to CSEC DEV Club</h1>
            <p className='font-light'>Join CSEC DEV Club for collaborative learning and innovation. Elevate your skills and connect with enthusiasts.</p>
            <a href="#login" className='bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-32 appearance-none leading-normals'>Get Started</a>
           </div>
           <div className="flex justify-center items-center w-[40%] max-sm:hidden">
             <img src="/hero_illustration.png" alt="illustration" className='h-96'/>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
