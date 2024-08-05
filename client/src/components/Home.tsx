import { useEffect, useState } from 'react';
import { useAppContext } from '../context/ContextProvider';
import { FolderCard } from './FolderCard';
import { Spinner } from './Spinner';

export const Home = () => {
    const {folders, updateFolders} = useAppContext();
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
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">No files here yet</h1>
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
