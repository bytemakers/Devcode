import { useState } from 'react';
import './hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  
  const addProject = async () => {
    if (localStorage.getItem('auth-token')) {
      navigate(`/newproject?redirect=${url}`);
    }
    else {
      navigate(`/login?redirect=${url}`);
    }
  }
  return (
    <section className="bg-black mt-20">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          {/*<a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm rounded-full bg-gray-800 text-white hover:bg-gray-700" role="alert">
              <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">DevCode is out! See what's new</span>
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </a>*/}
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Grow, Share And Connect With Developers</h1>
          <br></br>
          <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">A collaborative open source environment for developers to share their projects and contribute to many more.</p>
          <div className="flex flex-col mb-10 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

            <form onSubmit={addProject} className="flex rounded-md">
              <div className="gradient-border flex rounded-md">
                <span className="inline-flex font-extrabold items-center pl-5 text-[15px] rounded-l-md border-r-0 bg-gray-600 text-white border-gray-600">
                  github.com/
                </span>
                <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" id="website-admin" className="rounded-none border block flex-1 min-w-0 w-full text-sm  bg-gray-600 border-gray-600 placeholder-gray-400 text-white outline-none" placeholder="username/project" />
              </div>
              
              <button disabled={url === ""} type="submit" className="text-white z-40 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-r-lg text-sm px-7 py-[14px] text-center">Add Project</button>
            </form>

          </div>
      </div>
    </section>
  )
}

export default Hero