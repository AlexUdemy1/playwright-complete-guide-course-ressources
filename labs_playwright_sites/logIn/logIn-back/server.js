const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ Allow frontend requests & enable credentials
app.use(cors({
    origin: 'http://localhost:5173',  // Adjust if your frontend is elsewhere
    credentials: true
}));

const SECRET_KEY = 'your_secret_key';

// 🔹 Fake users
const fakeUsers = [
    { username: 'user', password: 'user_udemy_playwright' }
];

const fakeItems = [
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'pinneaple'},
    {name: 'apple'},
    {name: 'cherry'}
]

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 🔴 Fix: Ensure the user exists before issuing a token
    const user = fakeUsers.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });  // ✅ Proper error response
    }

    // ✅ Generate JWT token only if credentials are correct
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // ✅ Set HTTP-only cookie
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,  // Change to true in production
        sameSite: 'Lax',
        path: '/'
    });

    res.json({ message: 'Logged in successfully' });
});

// 🔹 Protected Route (Verifies Cookie)
app.get('/profile', (req, res) => {
    const token = req.cookies.auth_token;  // ✅ Read token from cookie

    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ username: decoded.username, message: 'Authenticated' });
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
});

app.get('/items', (req, res) => {
    try {
        res.json(fakeItems)
    } catch (error) {
        res.status(403).json({message: 'Invalid List'});
    }
})

// Start server
app.listen(3001, () => console.log('✅ Fake SSO Server running on port 3001'));
