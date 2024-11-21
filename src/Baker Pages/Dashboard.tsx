
import { Link } from "react-router-dom";
import "./Dashboard.css";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, Baker!</h1>
      </header>
      <div className="dashboard-content">
        <div className="manage-section">
          <h2>Manage</h2>
          <Link to="/orders" className="btn">Orders</Link>
          <Link to="/inventory" className="btn">Inventory</Link>
        </div>
        <div className="menu-section">
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
        </div>
        <br>
      </br>
      <button className="nav-button">
        <Link to="/NavigatePage" >Navigation Page </Link>
        </button>
      </div>
    </div>
  );
};


export default Dashboard;
