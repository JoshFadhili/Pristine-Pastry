import { AddUser, CardProps, OrderProps } from "./lib/types";
import { account, databases, ID } from "./config";

// Function to add a login
export async function addLogin(website: string, password: string): Promise<CardProps> {
  const user = await account.get();
  const userId = user.$id;
  const newCard = {
    website: website,
    password: password,
    userId: userId
  };
  try {
    const response = await databases.createDocument(
      '673f358f0020553b4468',
      import.meta.env.VITE_APPWRITE_CREDENTIALS_ID,
      ID.unique(),
      newCard
    );
    const login = {
      $id: response.$id,
      website: response.website,
      password: response.password
    };
    return login;
  } catch (error) {
    console.error("Error adding login", error);
    throw error;
  }
}

// Function to add a user
export async function addUser(email: string, username: string): Promise<AddUser> {
  const newUser = {
    email: email,
    username: username
  };
  const response = await databases.createDocument(
    '673f358f0020553b4468',
    '673f361b0034e672526e',
    ID.unique(),
    newUser
  );
  const user = {
    $id: response.$id,
    email: response.email,
    username: response.username
  };
  return user;
}

// Function to get credentials
export async function getCredentials(): Promise<CardProps[]> {
  const response = await databases.listDocuments(
    '673f358f0020553b4468',
    import.meta.env.VITE_APPWRITE_CREDENTIALS_ID
  );
  const credentials = response.documents.map((card: any) => ({
    $id: card.$id,
    website: card.website,
    password: card.password
  }));
  return credentials;
}

// Function to delete a credential
export async function deleteCredential(cardId: string) {
  await databases.deleteDocument(
    '673f358f0020553b4468',
    import.meta.env.VITE_APPWRITE_CREDENTIALS_ID,
    cardId
  );
}

// Function to add an order
export async function addOrder(userId: string, name: string, price: number, date: string): Promise<OrderProps> {
  const newOrder = {
    userId: userId,
    name: name,
    price: price,
    date: date
  };
  const response = await databases.createDocument(
    '673f358f0020553b4468',
    '673f36f30019e4bddcd1',
    ID.unique(),
    newOrder
  );
  const order = {
    $id: response.$id,
    userId: response.userId,
    name: response.name,
    price: response.price,
    date: response.date
  };
  return order;
}

// Function to get orders for a user
export async function getOrders(userId: string): Promise<OrderProps[]> {
  const response = await databases.listDocuments(
    '673f358f0020553b4468',
    '673f36f30019e4bddcd1',
    [Query.equal('userId', userId)]
  );
  const orders = response.documents.map((order: any) => ({
    $id: order.$id,
    userId: order.userId,
    name: order.name,
    price: order.price,
    date: order.date
  }));
  return orders;
}