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
        console.log(token);
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


    const loginUsingGitHub = async (data) => {
        const response = await fetch('https://localhost:8181/api/auth/github', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
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
                        {loading && 'GitHub Login'}
                        <Authorizer onLogin={(data) => loginUsingGitHub(data)} onSignup={(data) => loginUsingGitHub(data)} />
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