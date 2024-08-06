import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
          <div className="max-w-lg w-full text-center">
            <h1 className="text-9xl font-bold text-blue-600">404</h1>
            <p className="text-4xl font-medium text-gray-800 mt-8">Page Not Found</p>
            <p className="text-xl text-gray-600 mt-4">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/" 
              className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      );
}
