import { useAppContext } from "../../context/ContextProvider";
import { useForm, SubmitHandler } from "react-hook-form"

interface FormInputs {
  name: string;
}

export const Modal: React.FC = () => {
    const {isModalOpen, closeModal, addFolder} = useAppContext();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
          const api = new URL("/api/folders", import.meta.env.VITE_PUBLIC_API_URL);
          const response = await fetch(api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: "include"
          });
          reset();
          if (!response.ok) {
            throw new Error('Failed to update profile');
          }
          const result = await response.json();
          closeModal();
          addFolder(result.folder);
        } catch (error) {
          console.error((error as Error).message);
        }
    };

    if (!isModalOpen) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white py-8 px-10 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Create New Folder</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                         Name
                        </label>
                        <input
                        id="name"
                        placeholder="Enter folder name"
                        {...register('name', { required: 'Folder name is required' })}
                        className={`mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm ${
                            errors.name ? 'border-red-500' : ''
                        }`}
                        />
                        {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#0061FF] text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};