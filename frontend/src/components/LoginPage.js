import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting email:', email, 'and password:', password);

        
        navigate('/home');
    };

    return (
        <div className="bg-red-100 h-screen flex items-center justify-center">
            <div className="bg-red-200 p-10 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Smart Campus Connect</h1>

                <form onSubmit={handleSubmit} className="text-center">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        Continue
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-700">
                        Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                    </p>
                    <p className="text-gray-700 mt-4">OR</p>
                    <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 flex items-center justify-center w-full">
                        <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-500" />
                        <span className="text-red-500">Continue with Google</span>
                    </button>
                </div>

                <div className="mt-8 text-center text-gray-500">
                    <a href="#" className="hover:underline">Terms of Use</a> | <a href="#" className="hover:underline">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
