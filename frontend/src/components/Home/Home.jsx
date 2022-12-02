import '../../App.css';
import { Helmet } from "react-helmet";
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';

const Home = () => {
  
  return (
    <div className='bg-black h-screen w-screen'>
        <Helmet>
            <title>DevCode | Home</title>
            <meta name="description" content="Grow, Share And Connect With Developers." />
        </Helmet>

        <Navbar />

        <Hero />

        <Footer />
    </div>
  )
}
export default Home