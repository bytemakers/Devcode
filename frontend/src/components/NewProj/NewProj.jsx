import Navbar from '../Navbar/Navbar';

const NewProj = () => {
    return (
       <div>
            <div className="nav">
                <Navbar />
            </div>
            <form className="bg-black">     
              <label for="countries" className="block mb-2 text-sm font-medium text-white">Select project level</label>
              <select id="countries" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                <option value={1}>Beginner</option>
                <option value={2}>Intermediate</option>
                <option value={3}>Advanced</option>
                <option value={4}>Expert</option>
              </select>
              <label className="block mb-2 text-sm font-medium text-white" for="user_avatar">Upload file</label>
              <input className="text-white block w-full text-sm rounded-lg border cursor-pointertext-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
              <div className="mt-1 text-sm text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
            </form>
       </div>
    )
  }

export default NewProj