// import { Request, Response } from "express";
// import { fakeUsers } from "../models/user.model";


// export const login = (req: Request, res: Response) => {
//     const { username, password } = req.body;

//     // 🔴 Fix: Ensure the user exists before issuing a token
//     const user = fakeUsers.find(u => u.username === username && u.password === password);
    
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid credentials' });  // ✅ Proper error response
//     }

//     // ✅ Generate JWT token only if credentials are correct
//     const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });

//     // ✅ Set HTTP-only cookie
//     res.cookie('auth_token', token, {
//         httpOnly: true,
//         secure: true,  // Change to true in production
//         sameSite: 'Lax',
//         path: '/'
//     });

//     res.json({ message: 'Logged in successfully' });
// }