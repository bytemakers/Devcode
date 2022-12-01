import '../../App.css';
import { Helmet } from "react-helmet";
import Navbar from '../Navbar/Navbar';

const Home = () => {
  
  return (
    <div className='bg-[#242424] h-screen w-screen'>
        <Helmet>
            <title>Collabs | Home</title>
            <meta name="description" content="Your Privacy Friendly, Open Source. Alternative to EverNote." />
        </Helmet>

        <Navbar />
    </div>
  )
}
export default Home