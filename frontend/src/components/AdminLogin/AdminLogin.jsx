import React from 'react'
import { Helmet } from "react-helmet";

const AdminLogin = () => {
  return (
    <div>
        <Helmet>
            <title>DevCode Admin UI | Login</title>
            <meta name="description" content="Admin Login Page At Devcode" />
        </Helmet>
        <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-gray-700 shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-white">Devcode Admin UI</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-white sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input autocomplete="off" id="adminusername" name="adminusername" type="text" className="bg-gray-700 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:borer-rose-600" placeholder="Admin Username" />
                                    <label for="email" className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Admin Username</label>
                                </div>
                                <br></br>
                                <div className="relative">
                                    <input autocomplete="off" id="adminpassword" name="adminpassword" type="password" className="bg-gray-700 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:borer-rose-600" placeholder="Admin Password" />
                                    <label for="password" className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Admin Password</label>
                                </div>
                                <br></br>
                                <div className="relative">
                                    <button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                                </div>
                                <br></br>
                                <div>
                                    <h1 className="text-center text-xl font-semibold text-amber-500">⚠️ Devcode users, Kindly Visit <a className="underline" href='/login'>this page</a> ⚠️</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin