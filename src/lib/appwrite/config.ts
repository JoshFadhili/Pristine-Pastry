import { Client, Account, Databases, Storage } from 'appwrite';

export const appwriteConfig = {
    projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
}

export const client = new Client()

client.setProject(appwriteConfig.projectID);
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export { ID } from 'appwrite'