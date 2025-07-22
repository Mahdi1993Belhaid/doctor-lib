import {defineStore} from 'pinia'
import { User } from '../models/User'
import { userService } from '../services/UserService'
export const useUserAuth = defineStore('userAuth',{

    state: () =>({

        user: {} as User,
        isAuthenticated:false
    }),
    actions:{
       async login(email:String,password:String){
         //const userAuth:User = await userService.getUserByEmail(email);
         const usernameForm="admin@gmail.com";
         const passwordForm="admin";
         /*
         if(!userAuth || userAuth.email !== email || userAuth.password!==password){
            throw new Error('username or password is incorrect')
         }
        */
       if(email !== usernameForm || password!==passwordForm){
        
            throw new Error('username or password is incorrect')
         }
         this.user = { 
      "id": "1",
      "username": "محمد_أحمد",
      "password": "password123",
      "email": "mohamed.ahmed@example.com",
      "firstName": "محمد",
      "lastName": "أحمد",
      "role": "admin",
      "avatar":"/images/default-profile.jpg",
      "specialty": null
    };
         this.isAuthenticated = true;
        },

        logout(){
            this.user = null;
            this.isAuthenticated = false;
        }
    }
    
})