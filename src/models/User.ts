export interface User {
    id: string;
    email: string; 
    password: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
    specialty?: string; 
    
  }

  export interface Doctor extends User{
     
  }

  export interface Patient extends User{

  }