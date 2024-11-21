import { useNavigate } from "react-router-dom";
import "./NavigationPage.css";

const NavigationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="navigation-page">
      <h1>Welcome to Cake Order Management System</h1>
      <div className="button-container">
        <button className="nav-button" onClick={() => navigate("/user")}>
          Homepage
        </button>
        <button className="nav-button" onClick={() => navigate("/baker")}>
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default NavigationPage;