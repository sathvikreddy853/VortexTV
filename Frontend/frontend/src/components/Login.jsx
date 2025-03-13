import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar1 from './Navbar1';

const Login = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) // based on http response codes 200 then ok is true 
            {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log(JSON.stringify(data.user));
                navigate('/dashboard');
            } 
            else 
            {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">

                {/* helps in gradient picking */}

                {/* https://gradienty.codes/tailwind-gradient-background */}


            <div className="flex items-center justify-center flex-grow bg-gradient-to-br from-blue-900 via-gray-900 to-black">
                <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>

                            {/* https://webcode.tools/html-generator */} 
                            {/* used for html buttons and html structure */}


                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    pattern=".+@[gG][mM][aA][iI][lL]\.com"
                                />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength="3"
                                />
                        </div>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out shadow-md"
                            type="submit"
                        >
                            Login
                        </button>
                        <div className="mt-4 flex flex-col items-center space-y-2">
                            <Link to="/signup" className="text-blue-400 hover:text-blue-500 transition">
                                Signup
                            </Link> 
                            <Link to="/forgot-password" className="text-blue-400 hover:text-blue-500 transition">
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
