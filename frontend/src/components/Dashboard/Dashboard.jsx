import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import { Helmet } from "react-helmet";

const Dashboard = () => {
    return (
        <div>
            <section className="bg-black">
            <Helmet>
              <title>DevCode | Dashboard</title>
              <meta name="description" content="Add New Project Submission to Devcode Here" />
            </Helmet>
            <div className="nav">
                <Navbar />
            </div>
            <label className="text-4xl text-white">Add New Project</label>
            <div className="flex flex-row">
                <div className="mt-10">
                    <a href="#" class="flex flex-col items-center border rounded-lg shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800 hover:bg-gray-700">
                        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="" alt="" />
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">Noteworthy technology acquisitions 2021</h5>
                            <p class="mb-3 font-normal text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </a>
                </div>

                <div className="mt-10 ml-10">
                    <a href="#" class="flex flex-col items-center border rounded-lg shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800 hover:bg-gray-700">
                        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="" alt="" />
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">Noteworthy technology acquisitions 2021</h5>
                            <p class="mb-3 font-normal text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </a>
                </div>
                
                <a href="#" class="ml-10 block max-w-sm p-6 border rounded-lg shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700">      
                    <p class="font-normal text-gray-400">Number Of Clicks</p>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">69</h5>
                </a>
            </div>
            </section>
        </div>
    )
  }

export default Dashboard