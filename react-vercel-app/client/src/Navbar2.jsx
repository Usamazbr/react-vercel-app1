import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ fixed }) {
    return (

        <nav className="bg-purple-900 px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                {/* <a href="https://flowbite.com/" className="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </a> */}
                <div className="flex md:order-2">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
                </div>
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200" id="navbar-sticky">
                    <ul className="flex flex-wrap -mb-px">
                        <li className="mr-2 inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300">
                            <Link to="/">Home </Link>
                        </li>
                        <li className="mr-2 inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500">
                            <Link to="/Livedetect">Livedetect </Link>
                        </li>
                        <li className="mr-2 inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300">
                            <Link to="/PhotoVerify">PhotoVerify </Link>
                        </li>
                        <li className="mr-2 inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300">
                            <Link to="/Verification">Verification </Link>
                        </li>
                        <li className="mr-2 inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300">
                            <Link to="/About">About </Link>
                        </li>
                        {/* <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Contact
                            </a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}