import { Link } from "react-router-dom";
import "./DetailsPage.css";
import { useCart } from './CartContext';

const ChocolateCakeDetails = () => {
  const { cart } = useCart();
  const { addToCart } = useCart();

  const chocolateCake = {
    id: 1,
    name: 'Chocolate Cake',
    price: 15, // Example price
    description: `
          This decadent chocolate cake is made with the finest cocoa powder, layered with a creamy chocolate mousse, 
          and finished with a luxurious ganache. Ideal for birthdays, anniversaries, or simply as a sweet indulgence. 
          Served with optional chocolate shavings or a scoop of vanilla ice cream for the ultimate dessert experience.
    `,
    image: '/images/chocolate-cake-large.jpg',
  };

  return (
    <div className="details-page">
      <div className="details-content">
        <h1>Chocolate Cake</h1>
        <p>
          This decadent chocolate cake is made with the finest cocoa powder, layered with a creamy chocolate mousse, 
          and finished with a luxurious ganache. Ideal for birthdays, anniversaries, or simply as a sweet indulgence. 
          Served with optional chocolate shavings or a scoop of vanilla ice cream for the ultimate dessert experience.
        </p>
        <p>
          Ingredients: Flour, sugar, eggs, cocoa powder, butter, milk, baking powder, and a hint of vanilla extract.
        </p>
        <p>
          <strong>Price: $15</strong>
        </p>
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(chocolateCake)}
        >
          Add to Cart
        </button>
        <br />
        <Link to="/cart">Proceed to Checkout ({cart.length})</Link>
        <br />
        <Link to="/user">Back to Home</Link>
      </div>
      <div className="details-image">
        <img src="/images/chocolate-cake-large.jpg" alt="Chocolate Cake" />
      </div>
    </div>
  );
};

export default ChocolateCakeDetails;
