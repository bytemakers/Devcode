import '../../App.css';
import { Helmet } from "react-helmet";
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';

const Home = () => {
  
  return (
    <div className='bg-black h-screen w-screen'>
        <Helmet>
            <title>Collabs | Home</title>
            <meta name="description" content="Your Privacy Friendly, Open Source. Alternative to EverNote." />
        </Helmet>

        <Navbar />

        <Hero />
    </div>
  )
}
export default Home