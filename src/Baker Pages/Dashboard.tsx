
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Header from "../Components/Header";
import OrderList from "./OrderList";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, Baker!</h1>
      </header>
      <div className="dashboard-content">
        <OrderList />
        {/* <div className="menu-section">
          <h2>Menu</h2>
          <div className="dropdown">
            <button className="dropdown-btn">Menu</button>
            <div className="dropdown-content">
              <Link to="/account-info">Account Info</Link>
              <Link to="/finance">Finance</Link>
              <Link to="/analytics">Analytics</Link>
              <Link to="/customer-interaction">Customer Interaction</Link>
            </div>
          </div>
        </div> */}
        <br>
      </br>
      <Header />
      </div>
    </div>
  );
};


export default Dashboard;
