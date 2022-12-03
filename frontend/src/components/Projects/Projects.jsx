import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Projects = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/');
        }
    }, []);
    
    return (
        <div className='bg-black'>
            <section className="bg-black dark:bg-black">
            <div className="nav">
                <Navbar />
            </div>
            </section>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <div className="rounded overflow-hidden shadow-lg">
            <img className="w-full" src="" alt="Mountain" />
            <div className="px-6 py-4">
                <div className="text-white font-bold text-xl mb-2">Mountain</div>
                <p className="text-gray-300 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#winter</span>
            </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg">
            <img className="w-full" src="" alt="River" />
            <div className="px-6 py-4">
                <div className="text-white font-bold text-xl mb-2">River</div>
                <p className="text-gray-300 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#summer</span>
            </div>
            </div>

            <div className="rounded overflow-hidden shadow-lg">
            <img className="w-full" src="" alt="Forest" />
            <div className="px-6 py-4">
                <div className="text-white font-bold text-xl mb-2">Forest</div>
                <p className="text-gray-300 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#fall</span>
            </div>
            </div>
            
        </div>
        </div>
    )
  }

export default Projects