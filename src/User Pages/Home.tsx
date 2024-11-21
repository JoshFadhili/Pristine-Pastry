import { Link } from "react-router-dom";
import "./Home.css";

import { useCart } from './CartContext';


const pastries = [
  {
    id: 1,
    name: "Chocolate Cake",
    image: "/images/chocolate-cake.jpg",
    description: "A rich and moist chocolate cake topped with silky chocolate ganache.",
    price: "$15",
  },
  {
    id: 2,
    name: "Vanilla Pastry",
    image: "/images/vanilla-pastry.jpg",
    description: "Light and fluffy vanilla sponge layered with creamy vanilla frosting.",
    price: "$10",
  },
  {
    id: 3,
    name: "Strawberry Tart",
    image: "/images/strawberry-tart.jpg",
    description: "Crisp pastry shell filled with sweet custard, topped with fresh strawberries.",
    price: "$12",
  },
];

const Home = () => {

  const { cart } = useCart();

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to the Pastry Shop!</h1>
        <div className="menu">
          <Link to="/account-info">Account Info</Link>
          <Link to="/track-orders">Track Orders</Link>
          <Link to="/complaints">Complaints</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
        </div>
      </header>
      <div className="items">
        {pastries.map((pastry) => (
          <div key={pastry.id} className="item">
            <img src={pastry.image} alt={pastry.name} />
            <h3>{pastry.name}</h3>
            <p>{pastry.description}</p>
            <p><strong>{pastry.price}</strong></p>
            <Link to={`/item/${pastry.id}`}>View Details</Link>
          </div>
        ))}
      </div>
      <br>
      </br>
      <button className="nav-button">
        <Link to="/NavigatePage" >Navigation Page </Link>
        </button>
    </div>
  );
};

export default Home;
