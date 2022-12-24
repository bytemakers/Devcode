import React from 'react'

const Footer = () => {
  return (
    <footer className="p-4 text-white relative bottom-0 flex w-[100%] rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 bg-[#5a00b1]">
        <span className="text-sm text-white sm:text-center">© 2022 <a href="https://github.com/dvstechlabs" className="hover:underline">DVS Tech Labs</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
            <li>
                <a href="/" className="mr-4 hover:underline md:mr-6 ">Home</a>
            </li>
            <li>
                <a href="/#features" className="mr-4 hover:underline md:mr-6">Feature</a>
            </li>
            <li>
                <a href="/projects" className="mr-4 hover:underline md:mr-6">Projects</a>
            </li>
            <li>
                <a href="https://github.com/dvstechlabs/devcode" className="hover:underline">Github</a>
            </li>
        </ul>
    </footer>
  )
}

export default Footer