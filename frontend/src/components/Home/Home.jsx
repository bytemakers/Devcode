import '../../App.css';
import { Helmet } from "react-helmet";
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import { BoltIcon, DevicePhoneMobileIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'

const Home = () => {

  const features = [
    {
      name: 'Showcase Your Projects',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: GlobeAltIcon,
    },
    {
      name: 'Collab With Awesome People',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: ScaleIcon,
    },
    {
      name: 'Transfers are instant',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: BoltIcon,
    },
    {
      name: 'Mobile notifications',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: DevicePhoneMobileIcon,
    },
  ]
  
  return (
    <div>
        <Helmet>
            <title>DevCode | Home</title>
            <meta name="description" content="Grow, Share And Connect With Developers." />
        </Helmet>

        <Navbar />

        <Hero />

          <div className="bg-black py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="sm:text-center">
              <h2 className="text-lg font-semibold leading-8 text-purple-600">Features</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">The Only Platform To</p>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-200">
                Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                accusamus quisquam.
              </p>
            </div>

            <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
              <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-black sm:shrink-0">
                      <feature.icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <div className="sm:min-w-0 sm:flex-1">
                      <p className="text-lg font-semibold leading-8 text-white">{feature.name}</p>
                      <p className="mt-2 text-base leading-7 text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> 

        <Footer />
    </div>
  )
}
export default Home