import { Suspense, useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Helmet } from "react-helmet";
import './newproject.css'

const NewProj = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [language1, setLanguage1] = useState(false);
  const [language2, setLanguage2] = useState(false);
  const [language3, setLanguage3] = useState(false);
  const [language4, setLanguage4] = useState(false);
  const [language5, setLanguage5] = useState(false);
  const [language6, setLanguage6] = useState(false);
  const [language7, setLanguage7] = useState(false);
  const [language8, setLanguage8] = useState(false);
  const [language9, setLanguage9] = useState(false);
  const [language10, setLanguage10] = useState(false);
  const [repoName, setRepoName] = useState("DevCode");
  const [repoLink, setRepoLink] = useState("https://github.com/devarshishimpi/devcode");
  const [level, setLevel] = useState(null);
  const [image, setImage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login');
    }
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    const langArr = [];
    if (language1) {
      langArr.push("Javscript");
    }
    if (language2) {
      langArr.push("React");
    }
    if (language3) {
      langArr.push("Angular");
    }
    if (language4) {
      langArr.push("MongoDB");
    }
    if (language5) {
      langArr.push("CSS");
    }
    if (language6) {
      langArr.push("TailwindCSS");
    }
    if (language7) {
      langArr.push("Bootstrap CSS");
    }
    if (language8) {
      langArr.push("Bulma");
    }
    if (language9) {
      langArr.push("NodeJS");
    }
    if (language10) {
      langArr.push("Others");
    }


    const authtoken = localStorage.getItem('auth-token');
    const response = await fetch('http://localhost:8181/api/auth/uploadproject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken
      },
      body: JSON.stringify({ name, description, langArr, repoName, repoLink, level, image })
    });
    const json = await response.json();
    console.log(json);
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  }

  const setFileToBase = (file) => {
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = () => {
      setImage(render.result);
    }
  }

    return (
       <div>
          <Helmet>
              <title>DevCode | New Project</title>
              <meta name="description" content="Add New Project Submission to Devcode Here" />
          </Helmet>
            <div className="nav">
                <Navbar />
            </div>
            <div className="p-12 max-w-7xl m-auto">
              <label className="text-4xl text-white">Add New Project</label>
              <div className="flex flex-col p-4 bg-gray-900 my-4 rounded-2xl">
                <div class="mt-12 mb-6">
                  <label htmlFor="base-input" class="block mb-2 text-xl font-medium text-white">Project Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="base-input" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 outline-none text-white" placeholder="Project Title"></input>
                </div>
                <div class="mb-6">
                    <label htmlFor="large-input" class="block mb-2 text-xl font-medium text-white"> Project Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="large-input" class="block p-4 w-full bg-gray-700 rounded-lg sm:text-md placeholder-gray-400 text-white outline-none" placeholder="Project Description"/>
                </div>
              </div>

              <div className="flex flex-col p-4 bg-gray-900 rounded-2xl">
                <form onSubmit={formSubmit} className="space-y-5 flex flex-col">     
                  <label htmlFor="countries" className="block mb-2 text-xl font-medium text-white">Select project level</label>
                  <select onChange={(e) => setLevel(e.target.value)} id="countries" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none">
                    <option value={1}>Beginner</option>
                    <option value={2}>Intermediate</option>
                    <option value={3}>Advanced</option>
                    <option value={4}>Expert</option>
                  </select>
                
                <fieldset>
                  <label htmlFor="countries" className="block mb-4 text-xl font-medium text-white">Select the technologies for your project</label>
                  <legend class="sr-only">Checkbox variants</legend>
                  <div className='flex flex-row space-x-40'>
                    <div>
                      <div class="flex items-center mb-4">
                          <input checked={language1} onChange={(e) => setLanguage1(!language1)} id="checkbox-1" type="checkbox" value={language1} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-1" class="ml-2 text-sm font-medium text-gray-300">Javascript</label>
                      </div>

                      <div class="flex items-center mb-4">
                          <input checked={language2} onChange={(e) => setLanguage2(!language2)} id="checkbox-2" type="checkbox" value={language2} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-2" class="ml-2 text-sm font-medium text-gray-300">React</label>
                      </div>

                      <div class="flex items-center mb-4">
                          <input checked={language3} onChange={(e) => setLanguage3(!language3)} id="checkbox-3" type="checkbox" value={language3} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">Angular</label>
                      </div>

                      <div class="flex items-center mb-4">
                          <input checked={language4} onChange={(e) => setLanguage4(!language4)} id="checkbox-4" type="checkbox" value={language4} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-4" class="ml-2 text-sm font-medium text-gray-300">MongoDB</label>
                      </div>
                      
                      <div class="flex items-center mb-4">
                          <input checked={language5} onChange={(e) => setLanguage5(!language5)} id="checkbox-5" type="checkbox" value={language5} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-5" class="ml-2 text-sm font-medium text-gray-300">CSS</label>
                      </div>
                    </div>

                    <div>
                      <div class="flex items-center mb-4">
                          <input checked={language6} onChange={(e) => setLanguage6(!language6)} id="checkbox-6" type="checkbox" value={language6} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-6" class="ml-2 text-sm font-medium text-gray-300">Tailwind CSS</label>
                      </div>

                      <div class="flex items-center mb-4">
                          <input checked={language7} onChange={(e) => setLanguage7(!language7)} id="checkbox-7" type="checkbox" value={language7} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-7" class="ml-2 text-sm font-medium text-gray-300">Bootstrap CSS</label>
                      </div>

                      <div class="flex items-center mb-4">
                          <input checked={language8} onChange={(e) => setLanguage8(!language8)} id="checkbox-8" type="checkbox" value={language8} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-8" class="ml-2 text-sm font-medium text-gray-300">Bulma</label>
                      </div>

                      <div class="flex items-center mb-4">
                          <input checked={language9} onChange={(e) => setLanguage9(!language9)} id="checkbox-9" type="checkbox" value={language9} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-9" class="ml-2 text-sm font-medium text-gray-300">Nodejs</label>
                      </div>

                      <div class="flex items-center mb-4">
                          <input checked={language10} onChange={(e) => setLanguage10(!language10)} id="checkbox-10" type="checkbox" value={language10} class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                          <label htmlFor="checkbox-10" class="ml-2 text-sm font-medium text-gray-300">Others</label>
                      </div>
                    </div>
                  </div>

                </fieldset>
                  <label className="block mb-[-20px] text-xl font-medium text-white" htmlFor="user_avatar">Upload Project Banner</label>
                  <input onChange={handleImage} className="text-gray-400 block w-full text-sm rounded-lg border cursor-pointertext-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />

                  <div className="mt-1 text-sm text-gray-300" id="user_avatar_help">A project banner showcases a image banner with some info about your project.</div>



                  {/* <button type='submit' className='flex w-[100%] justify-center items-center p-2 rounded-full '>Submit</button> */}
                  <button type="submit" className="text-white z-40 bg-gradient-to-br rounded-xl from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-r-lg text-sm px-7 py-[14px] text-center">Add New Project</button>
                </form>
              </div>
            </div>
          </div>
    )
  }

export default NewProj