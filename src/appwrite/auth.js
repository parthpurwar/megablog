import conf from "../confi/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client = new Client();
//here we make such a method so suppose if we use any other backend srivice rather than appwrite then we can just make the changfes here only and will take the same input of email, password and username from te user.
    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('668982d400017406094e')
        // .setKey('bded9802ad3851b5ecffbbf45b22034240ad67bfbda9e655992a8eb671634331f7637f190f29c0de9a4815249e4fb06d3ca3cd8184570a87bad387485d377dce53d87ffd7d9b4cf278403e9b2a9d917e73d58cc6dfe437b1193cd64bfe632cf649d6006f266798b660fbde1ef9e19ddb599767635df7f11c46cf3db009abe62a')
        this.account= new Account(this.client)
        console.log(this.account)
    }
        
    async createAccount({email,password,name}){
        try{
          const userAccount =   await this.account.create(ID.unique(),email, password, name);
          if(userAccount){
            //call another method
            return this.login({email,password})
            
          }
          else{
            return userAccount;
          }
        }//here we created account with the given inputs along with a unique id which is mandatory
        catch(error){
            throw error;
        }
    }
    async login({email,password}){
        try{
                await this.account.ctreateEmailSession(email, password);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            // throw error;
            console.log("Appwrite service:: getCurrentUser :: error", error)
        }
        return null;
    }
    
    async logout(){
        try{
            await this.account.deleteSessions();     
        }
        catch(error){
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authservice = new AuthService();
console.log(authservice)
export default authservice
