import { Client, Account, Databases, Storage } from 'appwrite';

export const appwriteConfig = {
    projectID: '673f32b90025e46f84ab',
}

export const client = new Client()

client.setProject('673f32b90025e46f84ab');
client.setEndpoint('https://cloud.appwrite.io/v1')

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export { ID } from 'appwrite'