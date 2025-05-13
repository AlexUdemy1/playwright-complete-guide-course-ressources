import bcrypt from 'bcrypt';

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    postalCode: string;
    address: string;
    country: string;
    username: string;
    password: string; // Encrypted
    label?: string;
  }
  

  export const users: User[] = [{firstname: "admin", lastname: "admin", email: "admin@gmail.com", username: "admin", password: bcrypt.hashSync("admin", 10), postalCode: '75000', country: "FR", address: "xxx", }];
  
  export default users;
  