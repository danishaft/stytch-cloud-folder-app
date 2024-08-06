import { RxAvatar } from "react-icons/rx";
import { FaBell, FaSearch } from 'react-icons/fa';
import { MdLogout } from "react-icons/md";
import { useStytchB2BClient} from '@stytch/react/b2b'
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/ContextProvider";

export const Navbar = () => {
    const {user} = useAppContext();
    const stytch = useStytchB2BClient();
    const navigate = useNavigate();
    const logOut = useCallback(async () => {
        await stytch.session.revoke();
        navigate("/")
    },[navigate, stytch])
  return (
    <nav className="flex justify-between items-center h-20 py-2 px-8 bg-[#fcfcfc] shadow-lg">
      <div className="mr-6">
        <h1 className="text-2xl font-bold text-[#051F61] mb-1">My Cloud</h1>
        <p className="text-xs text-[#757897] font-semibold capitalize">Welcome, {user?.name}👋</p>
      </div>
      <div className="flex-grow mx-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full py-1 px-3 pr-10 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative">
          <FaBell className="text-xl " />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        <div className="ml-2">
            <RxAvatar className="text-2xl" />
        </div>
        <button 
            className="px-3 py-2 bg-[#0061FF] text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={logOut}
        >
          <MdLogout />
        </button>
      </div>
    </nav>
  )
}
