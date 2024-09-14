import { Outlet, Link } from "react-router-dom";
import React, {useState} from 'react';



function Layout(){

    
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleMenu = () => {
          setIsOpen(!isOpen);
        };
    


    return(
        <body className="bg-zinc-100 min-h-screen">
        <nav className="bg-teal-500 p-1">
            <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-bold">
                Karibu Stores
            </div>
            <ul className="hidden md:flex space-x-6">
                <li className="text-white hover:text-black"><Link to='/'>Home</Link></li>
                <li className="text-white hover:text-black"><Link to='Products'>Products</Link></li>
                <li className="text-white hover:text-black"><Link to='Contacts'>Contact Us</Link> </li>
            </ul>
            
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {isOpen && (
            <div className="md:hidden">
                <ul className="flex flex-col space-y-4 mt-4">
                <li className="text-white hover:text-black"><Link to='/'>Home</Link></li>
                <li className="text-white hover:text-black"><Link to='Products'>Products</Link></li>
                <li className="text-white hover:text-black"><Link to='Contacts'>Contact Us</Link> </li>
                </ul>
            </div>
            )}

            

            </div>
        </nav>
        <Outlet />
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <ul className="flex space-x-6 mb-4 md:mb-0">
                <li><Link to='/' className="hover:text-gray-400">Home</Link></li>
                <li><Link to='/Products' className="hover:text-gray-400">Products</Link></li>
                <li><Link to='/Contacts' className="hover:text-gray-400">Contact Us</Link></li>
                </ul>
                <div className="text-center md:text-right">
                <p>&copy; 2024 All Rights Reserved.</p>
                <p>Developed by Paul Okweso</p>
                <p><a href="mailto:paulokweso7@gmail.com" className="hover:text-gray-400">paulokweso7@gmail.com</a></p>
                </div>
            </div>
            </footer>

        
        </body>
    )
}

export default Layout;