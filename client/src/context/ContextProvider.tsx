import { createContext, useState, useContext, ReactNode } from 'react';
import { ContextType, Folder, User } from '../types';

const AppContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const updateUser = (userData: User) => {
        setUser(userData);
    };
    const updateFolders = (folderData: Folder[]) => {
        setFolders(folderData);
    };
    const addFolder = (newFolder: Folder) => {
        setFolders(prevFolders => [...prevFolders, newFolder]);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  return (
    <AppContext.Provider value={{user, folders, isModalOpen, updateUser, updateFolders, openModal, closeModal, addFolder}}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): ContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a ContextProvider');
    }
    return context;
}
