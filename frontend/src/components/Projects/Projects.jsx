import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Helmet } from "react-helmet";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Projects = () => {
    const navigate = useNavigate();

    const [projectList, setProjectList] = useState([]);
    const [filteredProjectLists, setFilteredProjectLists] = useState([]);
    const [currentlyActive, setCurrentlyActive] = useState(null);
    const [myDetails, setMyDetails] = useState([]);

    const getProjects = async () => {
        const response = await fetch('http://localhost:8181/api/auth/getprojects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        setProjectList(json);
        setFilteredProjectLists(json);
    }

    const getMyDetails = async () => {
      const authtoken = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:8181/api/auth/getuser' ,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authtoken
        }
      });
      const json = await response.json();
      setMyDetails(json);
    }

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            // navigate('/login');
            getProjects();
        }
        else {
            getProjects();
            getMyDetails();
        }
    }, []);


    const collaborateClick = async (id, link) => {
        const authtoken = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:8181/api/auth/increaseclick', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            },
            body: JSON.stringify({ projectId: id })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            // Simulate a mouse click:
            window.location.href = link;

            // Simulate an HTTP redirect:
            window.location.replace(link);
        }
    }

    const sortOptions = [
        { name: 'Level: Easy', href: '#', current: false, id: 1 },
        { name: 'Level: Intermediate', href: '#', current: false, id: 2 },
        { name: 'Level: Advanced', href: '#', current: false, id: 3 },
        { name: 'Level: Expert', href: '#', current: false, id: 4 },
      ]

      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

      const filter = (id) => {
        if (currentlyActive === id) {
          setCurrentlyActive(null);
          setFilteredProjectLists(projectList);
        }
        else {
          setCurrentlyActive(id);
          if (id === 1) {
            setFilteredProjectLists(projectList.filter(project => project.level === 1));
          }
          else if (id === 2) {
            setFilteredProjectLists(projectList.filter(project => project.level === 2));
          }
          else if (id === 3) {
            setFilteredProjectLists(projectList.filter(project => project.level === 3));
          }
          else if (id === 4) {
            setFilteredProjectLists(projectList.filter(project => project.level === 4));
          }
        }
      }
  

      const mouseEnterHandlerImage = (projectId) => {
        const imageHover = document.getElementById(`image-hover-${projectId}`);
        imageHover.classList.add('opacity-20');
      }

      const mouseLeaveHandlerImage = (projectId) => {
        const imageHover = document.getElementById(`image-hover-${projectId}`);
        imageHover.classList.remove('opacity-20');
      }

      const likeClicked = async (projectId) => {
        const authtoken = localStorage.getItem('auth-token');
        if (!authtoken) {
          toast.error("You need to login to like a project!!");
        }
        else {
          const response = await fetch('http://localhost:8181/api/project/likeproject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': authtoken
            },
            body: JSON.stringify({ projectId })
          });
          const json = await response.json();
          await getProjects();
        }
      }
    
    return (
        <div className='bg-black'>
            <Helmet>
              <title>DevCode | Projects</title>
              <meta name="description" content="View All Public Projects Submissions on DevCode" />
            </Helmet>
            <section className="bg-black dark:bg-black">
            <div className="nav">
                <Navbar focus={"projects"} />
            </div>
            </section>
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-10 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-white ml-10">Projects</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left mr-8">
                <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white hover:text-gray-300">
                    Filter
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white group-hover:text-gray-300"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={() => filter(option.id)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-300 bg-gray-500' : 'text-white',
                                active ? 'bg-gray-500' : '',
                                `block px-4 py-2 text-sm, option-${option.id} cursor-pointer`,
                                currentlyActive === option.id ? 'bg-gray-500' : ''
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {filteredProjectLists.length === 0?
                    <div className="mt-2 text-base leading-7 text-gray-300">
                        No projects found!
                    </div> :
                    filteredProjectLists.map((project) => {
                    return (
                        <div key={project._id} className="relative overflow-hidden shadow-lg bg-[#262626] p-0 rounded-xl">
                            {project.level === 1 && <span class="absolute font-extrabold bg-green-100 text-green-800 text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 z-20">Beginner</span>}
                            {project.level === 2 && <span class="absolute font-extrabold bg-yellow-100 text-yellow-800 text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900 z-20">Intermediate</span>}
                            {project.level === 3 && <span class="absolute font-extrabold bg-purple-100 text-purple-800 text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900 z-20">Advance</span>}
                            {project.level === 4 && <span class="absolute font-extrabold bg-red-100 text-red-800 text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 z-20">Expert</span>}
                            <div onMouseLeave={() => mouseLeaveHandlerImage(project._id)} onMouseEnter={() => mouseEnterHandlerImage(project._id)} className="relative flex">
                              <img id={`image-hover-${project._id}`} className="w-full cursor-pointer transition-all" src={project.image.url} alt="Mountain" />
                              <div className="absolute top-0 left-0 hover:z-30 w-full h-full flex flex-row justify-center cursor-pointer items-center opacity-0 hover:opacity-100 text-white ">
                              <button class="text-pink-500 background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex space-x-10 flex-row justify-center items-center border border-pink-500 rounded-full hover:bg-gray-500 hover:bg-opacity-30" type="button" onClick={() => likeClicked(project._id)}>
                                {project.likedBy.includes(myDetails._id) ? 
                                <>
                                <AiFillHeart style={{ fontSize: '30px' }} /> &nbsp;&nbsp; {project.likedBy.length} {project.likedBy.length === 1 ? 'Like' : 'Likes'}
                                </>
                                :
                                <>
                                <AiOutlineHeart style={{ fontSize: '30px' }} /> &nbsp;&nbsp; {project.likedBy.length} {project.likedBy.length === 1 ? 'Like' : 'Likes'}
                                </>
                              }
                              </button>
                              </div>
                            </div>
                            <div className="px-6 py-4">
                                <div className="text-white font-bold text-xl mb-2">{project.name}</div>
                                <p className="text-gray-300 text-base">
                                {project.description}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2 mb-[55px]">
                                {project.languages.map((language, index) => {
                                    return (
                                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#{language}</span>
                                    );
                                })}
                                {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#winter</span> */}
                            </div>
                            <button onClick={() => collaborateClick(project._id, project.repoLink)} href={project.repoLink} target="_blank" className='bg-purple-500 text-white bottom-0 p-4 flex w-full justify-center items-center absolute'>Collaborate</button>
                        </div>
                    );
                })}
            
            </div>
            <ToastContainer closeButton={false} toastStyle={{ backgroundColor: "#202d40", color: 'white' }} />
          </div>
    )
  }

export default Projects
