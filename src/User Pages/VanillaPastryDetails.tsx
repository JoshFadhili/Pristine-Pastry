import { Link } from "react-router-dom";
import "./DetailsPage.css";
import { useCart } from "./CartContext";

const VanillaPastryDetails = () => {
  const { cart } = useCart();
  const { addToCart } = useCart();

  const vanillaPastry = {
    id: 2,
    name: "Vanilla Pastry",
    price: 10, // Example price
    description: `
        A classic delight, our Vanilla Pastry is made with soft, fluffy sponge layers infused with natural vanilla bean. 
        Each bite melts in your mouth, complemented by a smooth vanilla buttercream frosting. 
        Perfect for tea-time treats, light celebrations, or a sweet indulgence any day!
    `,
    image: "/images/vanilla-pastry-large.jpg",
  };

  return (
    <div className="details-page">
      <div className="details-content">
        <h1>Vanilla Pastry</h1>
        <p>
          A classic delight, our Vanilla Pastry is made with soft, fluffy sponge layers infused with natural vanilla bean. 
          Each bite melts in your mouth, complemented by a smooth vanilla buttercream frosting. 
          Perfect for tea-time treats, light celebrations, or a sweet indulgence any day!
        </p>
        <p>
          Ingredients: Flour, sugar, butter, eggs, milk, vanilla bean extract, and a pinch of salt.
        </p>
        <p>
          <strong>Price: $10</strong>
        </p>
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(vanillaPastry)}
        >
          Add to Cart
        </button>
        <br />
        <Link to="/cart">Proceed to Checkout ({cart.length})</Link>
        <br />
        <Link to="/user">Back to Home</Link>
      </div>
      <div className="details-image">
        <img src="/images/vanilla-pastry-large.jpg" alt="Vanilla Pastry" />
      </div>
    </div>
  );
};

export default VanillaPastryDetails;
