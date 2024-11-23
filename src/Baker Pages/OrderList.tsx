
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
    const credentialsCollectionId = '673f36f30019e4bddcd1'; //orderCollectionId
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
    await deleteOrders(orderId)
  }
  return (
    <div>
      {orders.map((order) => (
        <div key={order.$id} id={order.$id} className='m-5'>
          <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-black shadow-md">
            <div className="p-6">
              <h3>Order ID: {order.$id}</h3>
              <p>Name: {order.name}</p>
              <p>Price: ${order.price}</p>
              <button
                  onClick={() => handleConfirmOrder(order.$id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-3"
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
        </div>
      ))}
    </div>
  );
};

export default OrderList;