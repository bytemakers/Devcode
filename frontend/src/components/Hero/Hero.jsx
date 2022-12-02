import React, { useState } from 'react';
import './hero.css';

const Hero = () => {
    const [heroInput, setHeroInput] = useState("");
  return (
    <div className='flex justify-center items-center h-[60%] flex-col'>
        <h1 className='text-white text-center height leading-normal text-6xl font-mono max-w-4xl place-content-center flex justify-center items-center'>Grow, Share And Connect With Developers</h1>
        <form className='w-[100%] flex justify-center items-center mt-7 text-lg'>
            <div className="input-wrapper w-[30%] rounded-lg p-6 bg-[#c4c4c4] absolute z-10">

            </div>
            <div className="hero-input-text flex w-[100%] absolute justify-center font-bold z-20 mr-72">github.com/</div>
            <div className="input-container flex z-20 justify-end w-[25%]">
                <input placeholder="username" onChange type="text" className='w-[55%] outline-none rounded-full py-2 px-[3px] bg-[#c4c4c4] placeholder-purple-700 placeholder:opacity-70 z-20' />
            </div>
            {/* <button className='flex z-40 bg-purple-700 text-white text-md p-[11px] rounded-r-lg'>This is a button</button> */}
            <button type="button" class="text-white z-40 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-r-lg text-sm px-7 py-[14px] text-center">Purple to Blue</button>
        </form>
    </div>
  )
}

export default Hero