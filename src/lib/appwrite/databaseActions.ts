import { Query } from "appwrite";
import { AddUser, OrderProps } from "../types";
import {  databases, ID} from "./config";

// Function to add a user
export async function addUser(email: string, username: string, contact: string,): Promise<AddUser> {
  const newUser = {
    email: email,
    username: username,
    contact:contact
  };
  const response = await databases.createDocument(
    '673f358f0020553b4468', // database id
    '673f361b0034e672526e', // user id
    ID.unique(),
    newUser
  );
  const user = {
    $id: response.$id,
    email: response.email,
    username: response.username,
    contact: response.contact,
  };
  return user;
}


// Function to add an order
export async function addOrder(userId: string, name: string, price: number): Promise<OrderProps> {
  const newOrder = {
    userId: userId,
    name: name,
    price: price,
  };
  const response = await databases.createDocument(
    '673f358f0020553b4468',  // database id
    '673f36f30019e4bddcd1',
    ID.unique(),
    newOrder
  );
  const order = {
    $id: response.$id,
    userId: response.userId,
    name: response.name,
    price: response.price,
  };
  return order;
}

// Function to get orders for a user
export async function getOrders(): Promise<OrderProps[]> {
  const response = await databases.listDocuments(
    '673f358f0020553b4468',//databaseId
    '673f36f30019e4bddcd1',//orderCollectionId
  );
  const orders = response.documents.map((order: any) => ({
    $id: order.$id,
    userId: order.userId,
    name: order.name,
    price: order.price,
  }));
  return orders;
}
export async function deleteOrders(userId: string){
  await databases.deleteDocument(
    '673f358f0020553b4468',//databaseId
    '673f36f30019e4bddcd1',//orderCollectionId
    userId,
  )
}