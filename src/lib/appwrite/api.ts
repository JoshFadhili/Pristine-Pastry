import { INewUser } from "@/types"
import { ID, Query } from "appwrite"
import { account, databases } from "./config"

//change the function name to register from createUserAccount
export async function createUserAccount(user:INewUser){
  //setLoading(true)
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.masterPassword,
      user.username
    )
    //await account.createEmailPasswordSession(user.email, user.masterPassword)
    if(!newAccount) throw Error
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      username: user.username,
      email: user.email,
      masterPassword: user.masterPassword,
    })
    return newUser
  } catch (error) {
    console.log(error)
    //return null
    //setLoading(false)
  }
}
export async function saveUserToDB(user:{
  accountId: string,
  username: string,
  email: string,
  masterPassword: string
}){
  try {
    const newUser = await databases.createDocument(
      '673f358f0020553b4468',
      '673f361b0034e672526e',
      ID.unique(),
      user
    )
    return newUser
  } catch (error) {
    console.log(error)
  }
}
