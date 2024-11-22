import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './User Pages/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
