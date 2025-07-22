import {User} from "../models/User"

export interface UserService{

    getUserByEmail(email:String):Promise<User>;
    getUsers():Promise<User[]>;
}

export class UserServiceImpl implements UserService{

    private users:User[] = [];

    constructor(){
        this.loadData();
    }

     async loadData(){
        const store = localStorage.getItem('users');
        if(store){
         this.users = JSON.parse(store);
         return 
        }
        try{
            const response = await fetch("/users.json");
        if(!response.ok){
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        this.users = await response.json();
        localStorage.setItem('users',JSON.stringify(this.users));

        }catch(error){
          throw error ;
        }
        

        
    }

    saveToLocalStorage(){

        localStorage.setItem('users',JSON.stringify(this.users));
    }

    async getUserByEmail(email: String): Promise<User> {
        
        await this.loadData();
        console.log(this.users)
        const user = this.users.find(us => us.email === email);
        console.log(user)
        if(!user){
            throw new Error('user is not found')
        }
        return  {...user}
    }

   async getUsers(): Promise<User[]> {
    await this.loadData();
    
    
    return [...this.users ] ;
    }
}

export const userService = new UserServiceImpl();