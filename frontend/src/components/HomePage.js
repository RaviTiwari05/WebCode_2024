import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';

function HomePage() {
    const [showProfile, setShowProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [announcementText, setAnnouncementText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');  // Redirect to login if no token is found
        } else {
            fetchAnnouncements();
            setIsLoading(false);
        }
    }, [navigate]);

    // Fetch announcements from the API
    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/announcements');
            if (response.ok) {
                const data = await response.json();
                setAnnouncements(data);
                setFilteredResults(data);
            } else {
                throw new Error('Failed to fetch announcements');
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const handleProfileClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
                setShowProfile(true);
            } else {
                throw new Error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token
        navigate('/');  // Redirect to login
    };

    // Handle announcement submission
    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ text: announcementText })
            });
    
            if (response.ok) {
                const newAnnouncement = await response.json();
                setAnnouncementText('');
                setAnnouncements([newAnnouncement, ...announcements]);
                setFilteredResults([newAnnouncement, ...filteredResults]);
            } else {
                const errorData = await response.json();
                console.error('Error posting announcement:', errorData.message);
                throw new Error(errorData.message || 'Failed to post announcement');
            }
        } catch (error) {
            console.error('Error posting announcement:', error);
        }
    };
    

    // Update filtered results based on search query
    useEffect(() => {
        const results = announcements.filter((announcement) =>
            announcement.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            announcement.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            announcement.userName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResults(results);
    }, [searchQuery, announcements]);

    if (showProfile) return <ProfilePage profileData={profileData} />;
    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-red-100 min-h-screen flex flex-col">
            <header className="bg-red-500 text-white p-4 flex items-center justify-between space-x-4">
                <h1 className="text-2xl font-bold">Smart Campus Connect</h1>
                <div className="flex-grow max-w-md">
                    <input
                        type="text"
                        placeholder="Search by text, department, or user"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                    />
                </div>
                <button
                    onClick={handleProfileClick}
                    className="text-white bg-red-700 px-4 py-2 rounded hover:bg-red-900"
                >
                    My Profile
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900"
                >
                    Logout
                </button>
            </header>

            <div className="flex-grow p-4">
                <form onSubmit={handleAnnouncementSubmit} className="mb-4">
                    <input
                        type="text"
                        placeholder="Share an announcement..."
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-900"
                    >
                        Post Announcement
                    </button>
                </form>

                <h2 className="text-xl font-bold mb-2">Announcements</h2>
                <ul>
                    {filteredResults.map((announcement) => (
                        <li key={announcement._id} className="border p-4 mb-2 rounded bg-white shadow-md">
                            <p className="text-lg font-medium">{announcement.text}</p>
                            <p className="text-sm text-gray-600">Department: {announcement.department}</p>
                            <p className="text-sm text-gray-600">Posted by: {announcement.userName}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;
