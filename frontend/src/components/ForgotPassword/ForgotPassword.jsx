import React, { useEffect, useState } from 'react'
import logo from '../../assets/devcode.png'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { Authorizer, AuthorizerSocialLogin, useAuthorizer } from '@authorizerdev/authorizer-react';

export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const search = useLocation().search;
    const redirectURI = new URLSearchParams(search).get('redirect');

    const forgotpassword = async(e) => {
        e.preventDefault();

    }
    return (
        <>
            <Helmet>
                <title>DevCode | Login</title>
                <meta name="description" content="Login to your Devcode account here." />
            </Helmet>
            <section className="bg-black">
                <div className="nav">
                    <Navbar focus={"none"} />
                </div>
                <div className="flex mt-[-90px] flex-col bg-black items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                        <img className="w-32 h-32 mr-2" src={logo} alt="logo" />
                        {/* DevCode */}
                    </a>
                    <div className="w-full bg-gray-800 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Forgot Password?
                            </h1>

                            <form className="space-y-4 md:space-y-6" onSubmit={forgotpassword}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Please enter your registered email to receive your forgot Password Link</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <button type="submit" className="bg-grey-200 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Send email</button>
                            <p className="text-sm font-light text-gray-400">
                            Remember Your Password? <Link to={redirectURI?`/login?redirect=${redirectURI}`:'/login'} className="font-medium text-primary-600 hover:underline text-primary-500">Login</Link>
                            </p>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer toastStyle={{ backgroundColor: "#202d40", color: 'white' }} />
            <Footer />
            </section>
        </>
    )
}
