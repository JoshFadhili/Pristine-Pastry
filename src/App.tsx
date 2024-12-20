import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './User Pages/CartContext'; // Import the provider
import HomePage from './HomePage';
import SignUp from './/SignUp';
import SignIn from './SignIn';

//Bakers Side Below
import Dashboard from "./Baker Pages/Dashboard";
import Orders from "./Baker Pages/OrderList";
import Inventory from "./Baker Pages/Inventory";
import AccountInfo from "./Baker Pages/AccountInfo";
import Finance from "./Baker Pages/Finance";
import Analytics from "./Baker Pages/Analytics";
import CustomerInteraction from "./Baker Pages/CustomerInteraction";

//Customers Side Below
import Home from "./User Pages/Home";
import Checkout from "./User Pages/Checkout";
import AccountInfoC from "./User Pages/AccountInfoC";
import TrackOrders from "./User Pages/TrackOrders";
import Complaints from "./User Pages/Complaints";
import ChocolateCakeDetails from "./User Pages/ChocolateCakeDetails";
import VanillaPastryDetails from "./User Pages/VanillaPastryDetails";
import StrawberryTartDetails from "./User Pages/StrawberryTartDetails";
import CartPage from './User Pages/CartPage';
import { AuthProvider } from './lib/AuthContext';
import PrivateRoutes from './lib/PrivateRoutes';




function App() {
  // put if else and return how it looks. If its Baker side return; 
  return (
    <CartProvider>
    <AuthProvider>
    <Router>
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/user" element={<Home />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        
        //Bakers Side Below
        <Route path="/baker" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/customer-interaction" element={<CustomerInteraction />} />

        //Customers Side Below
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account-infoC" element={<AccountInfoC />} />
        <Route path="/track-orders" element={<TrackOrders />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/item/1" element={<ChocolateCakeDetails />} />
        <Route path="/item/2" element={<VanillaPastryDetails />} />
        <Route path="/item/3" element={<StrawberryTartDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
    </AuthProvider>
    </CartProvider>
  );
}

export default App;
