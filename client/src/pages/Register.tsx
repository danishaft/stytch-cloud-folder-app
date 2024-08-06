import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextProvider";

interface FormInputs {
  firstName: string;
  lastName: string;
  orgName: string;
}

export const Register = () => {
  const {updateUser} = useAppContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const api = new URL("/api/users", import.meta.env.VITE_PUBLIC_API_URL);
      const response = await fetch(api, {
        method: 'PUT',
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
      updateUser(result.user);
      navigate("/")
    } catch (error) {
      console.error((error as Error).message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Complete Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              {...register('firstName', { required: 'First name is required' })}
              className={`mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm ${
                errors.firstName ? 'border-red-500' : ''
              }`}
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              {...register('lastName', { required: 'Last name is required' })}
              className={`mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm ${
                errors.lastName ? 'border-red-500' : ''
              }`}
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              id="orgName"
              {...register('orgName', { required: 'Organization name is required' })}
              className={`mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm ${
                errors.orgName ? 'border-red-500' : ''
              }`}
            />
            {errors.orgName && (
              <p className="mt-2 text-sm text-red-600">{errors.orgName.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}
