import { useCart } from './CartContext';
import './CartPage.css';
import { Link } from "react-router-dom";


const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart, date: new Date().toISOString() }),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        // Optional: Clear the cart after order confirmation
        // clearCart(); // Add a clearCart method in your CartContext
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
      <>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <br>
        </br>
        <button className="confirm-order-btn" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
      </>
      )}
      <br>
      </br>
      <br />
      <Link to="/user">Back to Home</Link>
    </div>
  );
};

export default CartPage;
