import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewUser = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const navigate = useNavigate();


    const getUserDetails = async () => {
        const authtoken = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:8181/api/auth/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        });
        const json = await response.json();
        if (json.fname !== "Default" && json.lname !== "Name") {
            navigate('/projects');
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/login');
        }
        else {
            getUserDetails();
        }
    }, []);
    

    const submitForm = async (e) => {
        e.preventDefault();
        const authtoken = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:8181/api/auth/github/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            },
            body: JSON.stringify({ fname: fname, lname: lname })
        });
        const json = await response.json();
        if (response.status === 200) {
            toast.success("Successfully logged In!");
            setTimeout(() => {
                window.location.replace("/projects");
            }, 1000);
        }
        else {
            toast.error("Some error occurred. Please try again later");
        }
    }
  return (
    <div className='text-white w-screen h-screen'>
        <form className='flex justify-center items-center flex-col h-full' onSubmit={submitForm}>
            <div className="mb-6 w-[20%]">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input value={fname} onChange={(e) => setFname(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-6 w-[20%]">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input value={lname} onChange={(e) => setLname(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-[20%]'>Let's Go</button>
        </form>
        <ToastContainer toastStyle={{ backgroundColor: "#202d40", color: 'white' }} />
    </div>
  )
}

export default NewUser;