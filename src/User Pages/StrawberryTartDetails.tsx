import { Link } from "react-router-dom";
import "./DetailsPage.css";
import { useCart } from "./CartContext";

const StrawberryTartDetails = () => {
  const { cart } = useCart();
  const { addToCart } = useCart();

  const strawberryTart = {
    id: 3,
    name: "Strawberry Tart",
    price: 12, // Example price
    description: `
        A delightful treat, our Strawberry Tart features a buttery, flaky crust filled with a luscious cream custard. 
        Topped generously with fresh, juicy strawberries and a light glaze, it’s a perfect combination of tart and sweet. 
        A refreshing dessert for any occasion!
    `,
    image: "/images/strawberry-tart-large.jpg",
  };

  return (
    <div className="details-page">
      <div className="details-content">
        <h1>Strawberry Tart</h1>
        <p>
          A delightful treat, our Strawberry Tart features a buttery, flaky crust filled with a luscious cream custard. 
          Topped generously with fresh, juicy strawberries and a light glaze, it’s a perfect combination of tart and sweet. 
          A refreshing dessert for any occasion!
        </p>
        <p>
          Ingredients: Flour, butter, sugar, cream, eggs, fresh strawberries, and a light glaze.
        </p>
        <p>
          <strong>Price: $12</strong>
        </p>
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(strawberryTart)}
        >
          Add to Cart
        </button>
        <br />
        <Link to="/cart">Proceed to Checkout ({cart.length})</Link>
        <br />
        <Link to="/user">Back to Home</Link>
      </div>
      <div className="details-image">
        <img src="/images/strawberry-tart-large.jpg" alt="Strawberry Tart" />
      </div>
    </div>
  );
};

export default StrawberryTartDetails;
