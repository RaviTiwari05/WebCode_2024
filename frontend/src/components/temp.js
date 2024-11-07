import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';

function HomePage() {
    const [showProfile, setShowProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [profileData, setProfileData] = useState(null); // Store profile data
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleProfileClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProfileData(data); // Store profile data
                setShowProfile(true);
            } else {
                throw new Error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Render ProfilePage if the user clicked "My Profile"
    if (showProfile) return <ProfilePage profileData={profileData} />;

    // Loading screen if still loading
    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-blue-50 min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4 flex items-center justify-between space-x-4">
                <h1 className="text-2xl font-bold">Smart Campus Connect</h1>
                
                <div className="flex-grow max-w-md">
                    <input
                        type="text"
                        placeholder="Search Announcements"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                    />
                </div>

                <button
                    onClick={handleProfileClick}
                    className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
                >
                    My Profile
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            <div className="flex-grow p-4">
                <div className="mb-4">
                    <ul>
                        {filteredResults.map((announcement) => (
                            <li key={announcement.id} className="border p-4 mb-2 rounded">
                                <p>{announcement.text}</p>
                                <p>Department: {announcement.department}</p>
                                <p>User: {announcement.userName}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
