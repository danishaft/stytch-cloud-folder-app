export  interface User {
    id: string;
    name: string;
    email: string;
    folders?: Folder[]
}

export  interface Folder {
    id: string;
    name: string;
    creatorId: string;
    creator?: User;
}

export interface ContextType {
    user: User | null;
    folders: Folder[];
    isModalOpen: boolean;
    updateUser: (userData: User) => void;
    updateFolders: (folderData: Folder[]) => void;
    openModal: () => void;
    closeModal: () => void;
    addFolder: (newFolder: Folder) => void;
}