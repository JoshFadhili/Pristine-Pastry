import { Link } from "react-router-dom";
import { useCart } from './CartContext';
import Header from "../Components/Header";

const pastries = [
  {
    id: 1,
    name: "Chocolate Cake",
    image: "https://inbloombakery.com/wp-content/uploads/2021/05/Chocolate-Berry-Cake-2-1.jpg",
    description: "A rich and moist chocolate cake topped with silky chocolate ganache.",
    price: "$15",
  },
  {
    id: 2,
    name: "Vanilla Pastry",
    image: "https://cdn.uengage.io/uploads/7175/image-479868-1715192346.jpeg",
    description: "Light and fluffy vanilla sponge layered with creamy vanilla frosting.",
    price: "$10",
  },
  {
    id: 3,
    name: "Strawberry Tart",
    image: "https://static.toiimg.com/thumb/55435839.cms?width=1200&height=900",
    description: "Crisp pastry shell filled with sweet custard, topped with fresh strawberries.",
    price: "$12",
  },
];

const Home = () => {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold">Welcome to the Pastry Shop!</h1>
          <div className="flex items-center space-x-6">
            <Header />
            <Link
              to="/cart"
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md font-semibold"
            >
              Cart ({cart.length})
            </Link>
          </div>
        </div>
      </header>

      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {pastries.map((pastry) => (
              <div key={pastry.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={pastry.image}
                  alt={pastry.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{pastry.name}</h3>
                  <p className="text-gray-500 mt-2">{pastry.description}</p>
                  <p className="mt-4 text-lg font-bold text-gray-700">{pastry.price}</p>
                  <Link
                    to={`/item/${pastry.id}`}
                    className="mt-4 inline-block text-purple-600 hover:text-purple-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
