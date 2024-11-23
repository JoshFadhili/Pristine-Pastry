import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-yellow-100 flex items-center justify-center">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Welcome to Pristine Pastry!
        </h1>
        <p className="text-gray-600 mb-6">
          Join us to experience the finest pastries crafted with perfection. Sign up now or log in to continue!
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signup">
            <button className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-300">
              Sign Up
            </button>
          </Link>
          <br />
          <br />
          <Link to="/signin">
            <button className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
