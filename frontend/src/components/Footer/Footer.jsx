import React from 'react'

const Footer = () => {
  return (
    <footer class="p-4 text-white relative bottom-0 flex w-[100%] bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-[#5a00b1]">
        <span class="text-sm text-white sm:text-center dark:text-white">© 2022 <a href="https://github.com/devarshishimpi/devcode" class="hover:underline">DevCode</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-white dark:text-white sm:mt-0">
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
                <a href="#" class="hover:underline">Contact</a>
            </li>
        </ul>
    </footer>
  )
}

export default Footer