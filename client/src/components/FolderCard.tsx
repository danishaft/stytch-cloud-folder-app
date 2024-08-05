interface FolderCardProps {
  name: string;
  onClick?: () => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({ name, onClick }) => {
  return (
    <div 
      className="inline-flex flex-col items-center m-2 cursor-pointer w-24 group"
      onClick={onClick}
    >
      <div className="relative w-16 h-12 group-hover:opacity-80 transition-opacity duration-200">
        <div className="absolute bottom-0 w-full h-4/5 bg-yellow-400 rounded-t-sm"></div>
        <div className="absolute bottom-0 w-full h-3/4 bg-yellow-300 rounded-tr-md rounded-b-md">
          <div className="absolute -top-2 left-0 w-2/5 h-2 bg-yellow-300 rounded-t-md"></div>
        </div>
      </div>
      <div className="mt-1 text-xs text-center break-words w-full group-hover:font-semibold">
        {name}
      </div>
    </div>
  );
};