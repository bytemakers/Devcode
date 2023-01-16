import React, { useEffect, useState } from 'react';
import logo from '../../assets/devcode.png'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {useLocation} from "react-router-dom";
import { Authorizer, AuthorizerSocialLogin, useAuthorizer } from '@authorizerdev/authorizer-react';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, token, loading } = useAuthorizer();
    
    const search = useLocation().search;
    const redirectURI = new URLSearchParams(search).get('redirect');

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            navigate('/projects');
        }
    }, []);

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8181/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.error) {
            toast.error(json.error);
        }
        else if (json.errors) {
            json.errors.forEach(error => {
                toast.error(error.msg);
            });
        }
        else if (json.authtoken) {
            localStorage.setItem('auth-token', json.authtoken);
            // toast.success(json.authtoken);
            if (!redirectURI) {
                navigate('/projects');
            }
            else {
                navigate(`/newproject?redirect=${redirectURI}`);
            }
        }
        else {
            toast.error('Internal Server Error');
        }
        console.log(json);
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
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={login}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-white text-sm font-medium text-primary-600 hover:underline text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="bg-grey-200 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-400">
                                Don't have an account yet? <Link to={redirectURI?`/register?redirect=${redirectURI}`:'/register'} className="font-medium text-primary-600 hover:underline text-primary-500">Sign up</Link>
                            </p>
                        </form>
                        {loading &&
                        <div className='relative'>
                            <button className='github-login-loading'>Sign in with Github</button>
                            <svg style={{ position: 'absolute', top: '12px', left: '10px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 291.32 291.32" width="24px" height="24px"><path d="M145.66 0C65.219 0 0 65.219 0 145.66c0 80.45 65.219 145.66 145.66 145.66s145.66-65.21 145.66-145.66C291.319 65.219 226.1 0 145.66 0zm40.802 256.625c-.838-11.398-1.775-25.518-1.83-31.235-.364-4.388-.838-15.549-11.434-22.677 42.068-3.523 62.087-26.774 63.526-57.499 1.202-17.497-5.754-32.883-18.107-45.3.628-13.282-.401-29.023-1.256-35.941-9.486-2.731-31.608 8.949-37.79 13.947-13.037-5.062-44.945-6.837-64.336 0-13.747-9.668-29.396-15.64-37.926-13.974-7.875 17.452-2.813 33.948-1.275 35.914-10.142 9.268-24.289 20.675-20.447 44.572 6.163 35.04 30.816 53.94 70.508 58.564-8.466 1.73-9.896 8.048-10.606 10.788-26.656 10.997-34.275-6.791-37.644-11.425-11.188-13.847-21.23-9.832-21.849-9.614-.601.218-1.056 1.092-.992 1.511.564 2.986 6.655 6.018 6.955 6.263 8.257 6.154 11.316 17.27 13.2 20.438 11.844 19.473 39.374 11.398 39.638 11.562.018 1.702-.191 16.032-.355 27.184C64.245 245.992 27.311 200.2 27.311 145.66c0-65.365 52.984-118.348 118.348-118.348S264.008 80.295 264.008 145.66c0 51.008-32.318 94.332-77.546 110.965z" fill="#2b414d"></path></svg>
                        </div>
                        }
                        <Authorizer />
                    </div>
                </div>
            </div>
            <ToastContainer toastStyle={{ backgroundColor: "#202d40", color: 'white' }} />
            <Footer />
        </section>
    </>
  )
}

export default Login