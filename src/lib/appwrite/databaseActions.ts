import { AddUser, CardProps } from "@/types";
import { account, databases, ID } from "./config";

export async function addLogin(website:string, password: string):Promise<CardProps>{
  const user = await account.get()
  const userId = user.$id
  const newCard = {
    website:website,
    password: password,
    userId: userId
  }
  try {
    const response = await databases.createDocument(
      '673f358f0020553b4468',
      import.meta.env.VITE_APPWRITE_CREDENTIALS_ID,
      ID.unique(),
      newCard
    )
    const login = {
      $id: response.$id,
      website: response.website,
      password: response.password
    }
    return login;
  } catch (error) {
    console.error("Error adding login", error)
    throw error;
  }
}
export async function addUser( email: string, username:string):Promise<AddUser>{
  const newUser ={
    email: email,
    username: username
  }
  const response = await databases.createDocument(
    import.meta.env.VITE_APPWRITE_DATABASES_ID,
    import.meta.env.VITE_APPWRITE_USER_COLLECTIONS_ID,
    ID.unique(),
    newUser,
  )
  const user ={
    $id: response.$id,
    email: response.email,
    username: response.username
  }
  return user
}
export async function getCredentials(): Promise<CardProps[]>{
  const response = await databases.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASES_ID,
    import.meta.env.VITE_APPWRITE_CREDENTIALS_ID,
  )
  const credentials = response.documents.map((card: any) => ({
    $id: card.$id,
    website: card.website,
    password: card.password
  }))
  return credentials
}
export async function deleteCredential(cardId: string){
  await databases.deleteDocument(
    import.meta.env.VITE_APPWRITE_DATABASES_ID,
    import.meta.env.VITE_APPWRITE_CREDENTIALS_ID,
    cardId,
  )
}