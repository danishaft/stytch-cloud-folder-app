import { useEffect, useState } from 'react';
import { useAppContext } from '../context/ContextProvider';
import { FcOpenedFolder } from "react-icons/fc";
import { FolderCard, Spinner } from '../components';

export const Home = () => {
    const {folders, updateFolders, openModal} = useAppContext();
    const [loading, setLoading] = useState(true);
    const api = new URL("/api/folders", import.meta.env.VITE_PUBLIC_API_URL);

    useEffect(() => {
      setLoading(true)
      fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      }).then(res => (
        res.json()
      )).then(result => {
        updateFolders(result.folders);
      }).finally(()=> setLoading(false))
    }, []);

    if(loading){
      return <Spinner/>
    }

  return (
    <div className="">
        {
          folders.length === 0 ?
          <div className="flex flex-col items-center justify-center h-[80vh] gap-8">
            <div className='text-center' >
              <FcOpenedFolder className='text-[7rem]'/>
            </div>
            <div className='text-center'>
              <p className='text-xs text-[#757897] font-semibold leading-5'>Folders let you keep your docs organized in one place.</p>
              <p className='text-xs text-[#757897] font-semibold'>All your folders will be listed here</p>
              <div className='flex items-center gap-4 mt-5'>
                <button className="flex items-center mt-auto px-6 py-2  text-[#757897] border font-semibold rounded-md shadow-sm transition duration-300 ease-in-out">
                  Sample folder
                </button>
                <button 
                  onClick={openModal} 
                  className="flex items-center mt-auto px-6 py-2 bg-[#0061FF] text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Create a folder
                </button>
              </div>
            </div>
          </div> :
          <div className="flex flex-wrap">
            
            {folders.map(folder => (
              <FolderCard key={folder.id} name={folder.name}/>
            ))}
          </div>
        }
    </div>
  )
}
