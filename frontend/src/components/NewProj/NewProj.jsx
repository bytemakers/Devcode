import { Suspense, useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Helmet } from "react-helmet";

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
            <div class="mb-6">
              <label for="base-input" class="block mb-2 text-xl font-medium text-white">Project Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="base-input" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Project Title"></input>
            </div>
            <div class="mb-6">
                <label for="large-input" class="block mb-2 text-xl font-medium text-white"> Project Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="large-input" class="block p-4 w-full bg-gray-700 rounded-lg border border-gray-300 sm:text-md placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Project Description"/>
            </div>
            <form onSubmit={formSubmit} className="bg-black">     
              <label for="countries" className="block mb-2 text-xl font-medium text-white">Select project level</label>
              <select onChange={(e) => setLevel(e.target.value)} id="countries" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                <option value={1}>Beginner</option>
                <option value={2}>Intermediate</option>
                <option value={3}>Advanced</option>
                <option value={4}>Expert</option>
              </select>
              
            <fieldset>
              <legend class="sr-only">Checkbox variants</legend>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language1)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">Javascript</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language2)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">React</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language3)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">Angular</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language4)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">MongoDB</label>
              </div>
              
              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language5)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">CSS</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language6)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">Tailwind CSS</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language7)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">Bootstrap CSS</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language8)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">Bulma</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language9)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">Nodejs</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language10)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-300">Others</label>
              </div>

            </fieldset>
              <label className="block mb-2 text-xl font-medium text-white" for="user_avatar">Upload file</label>
              <input onChange={handleImage} className="text-white block w-full text-sm rounded-lg border cursor-pointertext-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
              <div className="mt-1 text-sm text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>

              <button type='submit'>Submit</button>
            </form>
       </div>
    )
  }

export default NewProj