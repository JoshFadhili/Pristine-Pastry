import { Link, useNavigate } from "react-router-dom";
import { useCart } from './CartContext';
import { addOrder } from '../lib/appwrite/databaseActions';
import { useAuth } from '../lib/AuthContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    if (totalItems === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!user) {
      alert("Please log in to place an order.");
      navigate('/signin');
      return;
    }

    try {
      // Add each item in the cart as a separate order
      for (const item of cart) {
        await addOrder(
          user.$id,
          item.name,
          item.price * item.quantity,
        );
      }

      alert("Order placed successfully!");
      clearCart();
      navigate('/user');
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
      {totalItems === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-500">
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-2 text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-lg font-medium text-gray-800">
              <strong>Total Items:</strong> {totalItems}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </>
      )}
      <Link
        to="/user"
        className="mt-6 inline-block text-purple-600 hover:underline"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default CartPage;
