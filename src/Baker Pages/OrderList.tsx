import React, { useEffect, useState } from 'react';
import { deleteOrders, getOrders } from '../lib/appwrite/databaseActions';
import { client } from '../lib/appwrite/config';
import { OrderProps } from '../lib/types';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const credentials = await getOrders();
        setOrders(credentials);
      } catch (error) {
        console.error('Error fetching credentials:', error);
      }
    };

    fetchCredentials();
  }, []);

  useEffect(() => {
    const databasesId = '673f358f0020553b4468'; // database id
    const credentialsCollectionId = '673f36f30019e4bddcd1'; // orderCollectionId
    const channel = `databases.${databasesId}.collections.${credentialsCollectionId}.documents`;
    const unsubscribe = client.subscribe(channel, (response) => {
      const eventType = response.events[0];
      console.log(response.events);
      const changedOrder = response.payload as OrderProps;
      if (eventType.includes('create')) {
        setOrders((prevOrders) => [...prevOrders, changedOrder]);
      }

      if (eventType.includes('delete')) {
        setOrders((prevOrders) => prevOrders.filter((order) => order.$id !== changedOrder.$id));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleConfirmOrder = async (orderId: string) => {
    await deleteOrders(orderId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-6">
        {orders.map((order) => (
          <div
            key={order.$id}
            id={order.$id}
            className="flex flex-col items-center w-full max-w-sm bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-bold mb-2">Order ID: {order.$id}</h3>
            <p className="text-gray-700">Name: {order.name}</p>
            <p className="text-gray-700 mb-4">Price: ${order.price}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleConfirmOrder(order.$id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Confirm Fulfilled
              </button>
              <button
                onClick={() => handleConfirmOrder(order.$id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
