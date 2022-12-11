import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import { Helmet } from "react-helmet";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';

const Dashboard = () => {

    const [click, setClick] = useState(0);
    const [projectsList, setProjectsList] = useState([]);

    const navigate = useNavigate();

    const getMyProjects = async () => {
        const authtoken = localStorage.getItem('auth-token');

        const response = await fetch('http://localhost:8181/api/auth/getmyprojects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        });

        const json = await response.json();
        console.log(json);
        setProjectsList(json);
    }

    const countClicks = async () => {
        const authtoken = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:8181/api/auth/countclicks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        });
        const json = await response.json();
        console.log(json);
        setClick(json.clicks);
    }
    
    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/login');
        }
        getMyProjects();
        countClicks();
    }, []);
    
    return (
        <div>
            <section className="bg-black">
            <Helmet>
              <title>DevCode | Dashboard</title>
              <meta name="description" content="View DevCode Dashboard And Stats Here" />
            </Helmet>
            <div className="nav">
                <Navbar focus={"none"} />
            </div>
            <div className='flex w-[80%] justify-center items-center flex-col m-auto mt-5'>
                <label className="text-4xl text-white text-bold">Your Dashboard</label>
                <br></br>
                <label className="text-2xl text-gray-200 text-bold">Analytics</label>
                <br></br>
                <div className="flex flex-row max-h-40 w-full">
                        <a href="#" className="ml-5 block w-full p-6 border rounded-lg shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700">      
                            <p className="font-normal text-gray-400">Total Number Of Clicks</p>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{click}</h5>
                        </a>
                </div>
                <br></br>
                <label className="text-2xl text-gray-200 text-bold">Your Submitted Projects</label>
                <div className="flex flex-row ml-10 w-full">
                    <div className="flex flex-col w-full">
                        {projectsList.map((project) => {
                            return (
                                <div key={project._id} className="mt-10">
                                    <a href="#" className="flex flex-col items-center border rounded-lg shadow-md md:flex-row w-full border-gray-700 bg-gray-800 hover:bg-gray-700 md:justify-between">
                                        <div className='md:flex'>
                                            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={project.image.url} alt="" />
                                            <div className="flex flex-col justify-between p-4 leading-normal">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{project.name}</h5>
                                                <p className="mb-3 font-normal text-gray-400">{project.description}</p>
                                            </div>
                                        </div>
                                        <hr className='md:w-0 w-[100%] opacity-25' />
                                        <div className="flex text-white md:mr-10 my-4">
                                            <AiFillHeart className='text-pink-500 mr-2 text-2xl' /> <p className='font-bold'>{project.likedBy.length}</p>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}


                    </div>
                </div>
            </div>
            </section>
        </div>
    )
  }

export default Dashboard