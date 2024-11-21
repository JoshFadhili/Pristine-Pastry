import React, { useEffect, useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
}

interface Order {
  date: string;
  items: OrderItem[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h3>Order {index + 1}</h3>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;