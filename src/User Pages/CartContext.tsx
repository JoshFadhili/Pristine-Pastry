import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for a cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

// Define the context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Props for the CartProvider
interface CartProviderProps {
  children: ReactNode;
}

// Cart Provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
