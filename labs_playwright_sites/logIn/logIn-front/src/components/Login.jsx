import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({onLoginSuccess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // ✅ Initialize navigate function

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login successful:', data);
            onLoginSuccess(true);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div class="bg-white p-10 m-10">
            <h2 class="m-4 text-4xl text-black">Login</h2>
            <form class="m-8 flex flex-col" onSubmit={handleLogin}>
                <input 
                    class="bg-orange-500 p-4 rounded-2xl m-4"
                    type="text" 
                    id="username"
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    class="bg-orange-500 p-4 rounded-2xl m-4"
                    type="password" 
                    id="password"
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button class="m-4" type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div class="text-black bg-gray-300 p-4">
                <p class="">Connect with these credentials: </p>
                <p>User: user</p>
                <p>Password: user_udemy_playwright</p>
            </div>
        </div>
    );
};

export default Login