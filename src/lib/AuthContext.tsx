import {useContext, useState, useEffect, createContext} from "react"
import { account, databases } from "./appwrite/config";
import { ID } from "./appwrite/config";
import { createUserAccount } from "./appwrite/api";
import { INewUser } from "./types";
const AuthContext = createContext<{
  user: any;
  loading: boolean;
  loginUser: (userInfo: any) => void;
  logoutUser: () => void;
  createUserAccount: (userInfo: any) => void;
  checkUserStatus: () => void;
}>({
  user: null,
  loading: true,
  loginUser: () => {},
  logoutUser: () => {},
  createUserAccount: (userInfo: any) => {},
  checkUserStatus: () => {},
});

export const AuthProvider = ({children}:{children: React.ReactNode})=>{
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState<any>(null)

  useEffect(()=>{
    checkUserStatus()
  },[])
  const loginUser = async(userInfo:any) =>{
    setLoading(true)
    try {
      if(user){
        console.log("User already logged in")
        return
      }
      let response =  await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      )
      let accountDetails = await account.get()
      setUser(accountDetails)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
  const logoutUser = () =>{
    account.deleteSession('current')
    setUser(null)
  }

  async function createUserAccount(user:INewUser){
    setLoading(true)
    try {
      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.username,
      )
      await account.createEmailPasswordSession(user.email, user.password)
      let accountDetails = await account.get()
      if(newAccount){
        try {
          const newUser = await saveUserToDB({
            username: user.username,
            email: user.email,
            contact : user.contact,
            id:newAccount.$id
          })
          setUser(accountDetails)
          setLoading(false)
          return newUser
        } catch (error) {
          console.error("Failed to add user to DB",error)
          await account.deleteSession('current')
          setUser(null)
          setLoading(false)
          throw new Error("Failed to complete user registration")
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      return null
    }
    async function saveUserToDB(user:{
      id: string,
      username: string,
      email: string,
      contact: string,
    }){
      try {
        const newUser = await databases.createDocument(
          '673f358f0020553b4468', //Databse ID
          '673f361b0034e672526e', //user collections ID
          ID.unique(),
          user
        )
        return newUser
      } catch (error) {
        console.log(error)
      }
    }
  }
  const checkUserStatus = async() =>{
    try {
      let accountDetails = await account.get()
      setUser(accountDetails)
    } catch (error) {
      
    }
    setLoading(false)
  }
  const contextData = {
    user,
    loginUser,
    logoutUser,
    createUserAccount,
    checkUserStatus,
    loading
  }
  return(
    <AuthContext.Provider value ={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}
export const useAuth =()=>{return useContext(AuthContext)}
export default AuthContext