import { Link } from 'react-router-dom';
import { FaHome, FaFolder, FaUser, FaPlus } from 'react-icons/fa';
import { MdFolderShared } from "react-icons/md";
import { useAppContext } from '../../context/ContextProvider';


export const SideNav = () => {
  const {openModal} = useAppContext();
  return (
    <div className="fixed border-r-2 h-full w-64 bg-white shadow-xl">
      <div className="py-4 px-8 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-2 hover:bg-gray-100 rounded">
                <FaHome className="mr-2 text-[#0061FF]" />
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center p-2 hover:bg-gray-100 rounded text-[#757897]">
                <FaFolder className="mr-2" />
                Folders
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center p-2 hover:bg-gray-100 rounded text-[#757897]">
                <MdFolderShared className="mr-2"/>
                Shared
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center p-2 hover:bg-gray-100 rounded text-[#757897]">
                <FaUser className="mr-2" />
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <button 
          onClick={openModal} 
          className="flex items-center mt-auto px-6 py-2 bg-[#0061FF] text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" />
          New Folder
        </button>
      </div>
    </div>
  )
}
 