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
    const [currentTime, setCurrentTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchAnnouncements();
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://webcode-2024.onrender.com/api/announcements', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

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
            const response = await fetch('https://webcode-2024.onrender.com/api/auth/profile', {
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
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://webcode-2024.onrender.com/api/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ text: announcementText })
            });

            if (response.ok) {
                setAnnouncementText('');
                fetchAnnouncements();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to post announcement');
            }
        } catch (error) {
            console.error('Error posting announcement:', error);
        }
    };

    const handleDeleteAnnouncement = async (announcementId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://webcode-2024.onrender.com/api/announcements/${announcementId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                fetchAnnouncements();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete announcement');
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    useEffect(() => {
        const results = announcements.filter((announcement) =>
            announcement.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            announcement.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            announcement.userName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResults(results);
    }, [searchQuery, announcements]);

    const handleBackToHome = () => {
        setShowProfile(false);
    };

    if (showProfile) return <ProfilePage profileData={profileData} onBackToHome={handleBackToHome} />;
    if (isLoading) return <div className="text-center text-xl">Loading...</div>;

    return (
        <div className="bg-gradient-to-r from-slate-200 to-green-400 min-h-screen flex flex-col font-sans">
            <header className="bg-transparent text-black p-3 flex items-center justify-between sticky top-0 shadow-lg backdrop-blur-md bg-opacity-60 z-10">
                <h1 className="text-3xl font-bold">Smart Campus Connect</h1>

                <div className="flex-grow max-w-md">
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleProfileClick}
                        className="text-white bg-pink-900 hover:bg-teal-200 px-4 py-2 rounded"
                    >
                        My Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-pink-900 text-white hover:bg-teal-200 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex-grow p-6">
                <div className="text-center text-lg mb-4">
                    Current Time: {currentTime}
                </div>

                <form onSubmit={handleAnnouncementSubmit} className="mb-6">
                    <input
                        type="text"
                        placeholder="Share an announcement..."
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="border rounded px-4 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-slate-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-teal-500"
                    >
                        Post Announcement
                    </button>
                </form>

                <h2 className="text-2xl font-bold mb-4">Announcements</h2>

                <ul className="space-y-4">
                    {filteredResults.map((announcement) => (
                        <li key={announcement._id} className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100">
                            <div className="flex items-center space-x-6">
                                <p className="text-lg font-medium">{announcement.text}</p>
                                <p className="text-sm">Department: {announcement.department}</p>
                                <p className="text-sm">Posted by: {announcement.userName}</p>
                                <p className="text-sm">
                                    Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDeleteAnnouncement(announcement._id)}
                                className="mt-2 text-red-600 hover:text-red-900"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <footer className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white py-4 mt-auto">
                <div className="flex justify-center">
                    <p className="text-lg">© 2024 Smart Campus Connect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
