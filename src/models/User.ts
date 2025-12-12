export interface User {
    id?: string;
    email: string; 
    password: string;
    firstName: string;
    lastName: string;
    avatar:string;
    role: 'admin' | 'user';
    hospital:string;
    specialty?: string; 
    
  }

  export function createDefaultUser():User{

    return {
      id:undefined,
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      avatar:'',
      role:'admin',
      hospital:'',
      specialty:''
    }
  }

  export interface Doctor extends User{
     
  }

  export interface Patient extends User{

  }