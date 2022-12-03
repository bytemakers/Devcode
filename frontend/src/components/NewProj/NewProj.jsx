import { Suspense, useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const NewProj = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [language1, setLanguage1] = useState(false);
  const [language2, setLanguage2] = useState(false);
  const [language3, setLanguage3] = useState(false);
  const [language4, setLanguage4] = useState(false);
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
      langArr.push("MERN");
    }
    if (language2) {
      langArr.push("MEVN");
    }
    if (language3) {
      langArr.push("MEAN");
    }
    if (language4) {
      langArr.push("FARM");
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
            <div className="nav">
                <Navbar />
            </div>
            <div class="mb-6">
              <label for="base-input" class="block mb-2 text-sm font-medium text-white">Project Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="base-input" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"></input>
            </div>
            <div class="mb-6">
                <label for="large-input" class="block mb-2 text-sm font-medium text-white"> Project Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="large-input" class="block p-4 w-full bg-gray-700 rounded-lg border border-gray-300 sm:text-md placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <form onSubmit={formSubmit} className="bg-black">     
              <label for="countries" className="block mb-2 text-sm font-medium text-white">Select project level</label>
              <select onChange={(e) => setLevel(e.target.value)} id="countries" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                <option value={1}>Beginner</option>
                <option value={2}>Intermediate</option>
                <option value={3}>Advanced</option>
                <option value={4}>Expert</option>
              </select>
              
            <fieldset>
              <legend class="sr-only">Checkbox variants</legend>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage1(!language1)} id="checkbox-1" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage2(!language2)} id="checkbox-2" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="checkbox-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I want to get promotional offers</label>
              </div>

              <div class="flex items-center mb-4">
                  <input onChange={(e) => setLanguage3(!language3)} id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I am 18 years or older</label>
              </div>
              
              <div class="flex mb-4">
                  <div class="flex items-center h-5">
                      <input onChange={(e) => setLanguage4(!language4)} id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  </div>
                  <div class="ml-2 text-sm">
                      <label for="helper-checkbox" class="font-medium text-gray-900 dark:text-gray-300">Free shipping via Flowbite</label>
                      <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-400">For orders shipped from $25 in books or $29 in other categories</p>
                  </div>
              </div>

              {/* <div class="flex items-center">
                  <input id="international-shipping-disabled" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" disabled/>
                  <label for="international-shipping-disabled" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Eligible for international shipping (disabled)</label>
              </div> */}
            </fieldset>
              <label className="block mb-2 text-sm font-medium text-white" for="user_avatar">Upload file</label>
              <input onChange={handleImage} className="text-white block w-full text-sm rounded-lg border cursor-pointertext-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
              <div className="mt-1 text-sm text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>

              <button type='submit'>Submit</button>
            </form>
       </div>
    )
  }

export default NewProj