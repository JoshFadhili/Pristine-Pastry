export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    masterPassword: string;
};
export type INewUser = {
    email: string;
    username: string;
    password: string;
    contact: string;
};
export interface CardProps{
    $id: string
 website: string
 password: string
}
export interface AddUser {
    $id: string
    username: string,
    email:string,
}
export interface OrderProps{
  $id: string
  userId: string,
  name: string,
  price: number,
}