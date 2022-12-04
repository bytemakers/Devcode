import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Projects = () => {
    const navigate = useNavigate();

    const [projectList, setProjectList] = useState([]);

    const getProjects = async() => {
        const authtoken = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:8181/api/auth/getprojects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        });
        const json = await response.json();
        // console.log(json);
        setProjectList(json);
    }

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/');
        }
        else {
            getProjects();
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
                {projectList.map((project) => {
                    return (
                        <div key={project._id} className="overflow-hidden shadow-lg bg-[#262626] p-0 rounded-xl">
                            <img className="w-full" src="https://wallpaperbat.com/img/38515-train-track-wallpaper.jpg" alt="Mountain" />
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
                    );
                })}
            
            </div>
        </div>
    )
  }

export default Projects