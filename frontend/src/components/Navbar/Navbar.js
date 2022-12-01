import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';


const Navbar = () => {
  return (
    <>
      <header className='flex items-start justify-between sticky top-0 p-5 max-w-7xl mx-auto z-20 xl:items-center'>
        <motion.div
        initial = {{
            x: -500,
            opacity: 0,
            scale: 0.5
        }}
        animate = {{
            x: 0,
            opacity: 1,
            scale: 1
        }}
        transition = {{
            duration: 1.5, // In Seconds
        }}
        className='flex flex-row items-center'>
            {/* Social Icons */}
            <SocialIcon url="https://www.youtube.com" fgColor='gray' bgColor='transparent' />
            <SocialIcon url="https://www.youtube.com" fgColor='gray' bgColor='transparent' />
            <SocialIcon url="https://www.youtube.com" fgColor='gray' bgColor='transparent' />
            <SocialIcon url="https://www.youtube.com" fgColor='gray' bgColor='transparent' />

        </motion.div>

        <motion.div
        initial = {{
            x: 500,
            opacity: 0,
            scale: 0.5
        }}
        animate = {{
            x: 0,
            opacity: 1,
            scale: 1
        }}
        transition = {{
            duration: 1.5
        }}
        className='flex flex-row items-center text-gray-300 cursor-pointer'>
            <SocialIcon
                className='cursor-pointer'
                network='email'
                fgColor='gray'
                bgColor='transparent'
            />
            <p className='uppercase hidden md:inline-block text-sm text-gray-400'>Get in Touch</p>
        </motion.div>
      </header>
    </>
  )
}

export default Navbar