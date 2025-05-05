// export interface User {
//     username: string,
//     password: string
// }

// export const fakeUsers: User[] = [{ username: 'user', password: 'user_udemy_playwright' }];

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
  
  export const users: User[] = [];
  
  export default users;
  