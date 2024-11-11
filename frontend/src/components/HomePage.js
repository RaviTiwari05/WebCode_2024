import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { toast } from 'react-toastify';

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

    // Fetch announcements from the API with the Authorization header
    const fetchAnnouncements = async () => {
        try {
            const token = localStorage.getItem('token');  // Get token from localStorage
            const response = await fetch('http://localhost:5000/api/announcements', {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the token in the request headers
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
                setAnnouncementText('');
                fetchAnnouncements();  // Fetch the updated list after posting
            } else {
                const errorData = await response.json();
                console.error('Error posting announcement:', errorData.message);
                throw new Error(errorData.message || 'Failed to post announcement');
            }
        } catch (error) {
            console.error('Error posting announcement:', error);
        }
    };

    // Handle deleting an announcement
    const handleDeleteAnnouncement = async (announcementId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/announcements/${announcementId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                fetchAnnouncements(); // Re-fetch announcements after deletion
            } else {
                const errorData = await response.json();
                console.error('Error deleting announcement:', errorData.message);
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
        <div className="bg-gradient-to-r from-slate-200 to-red-400 min-h-screen flex flex-col font-sans">
            <header className="bg-transparent text-black p-3 flex items-center justify-between sticky top-0 shadow-lg backdrop-blur-md bg-opacity-60 z-10">
                <h1 className="text-3xl font-bold text-shadow">Smart Campus Connect</h1>
                <div className="flex-grow max-w-md">
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-4 py-2 w-full text-black-700 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleProfileClick}
                        className="text-white bg-pink-900 hover:bg-teal-200 px-4 py-2 rounded focus:outline-none"
                    >
                        My Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-pink-900 text-white hover:bg-teal-200 px-4 py-2 rounded focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex-grow p-6">
                <form onSubmit={handleAnnouncementSubmit} className="mb-6">
                    <input
                        type="text"
                        placeholder="Share an announcement..."
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="border rounded px-4 py-1.5 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-slate-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-teal-500 focus:outline-none"
                    >
                        Post Announcement
                    </button>
                </form>

                <h2 className="text-2xl font-bold text-black mb-4">Announcements</h2>
                <ul className="space-y-4">
                    {filteredResults.map((announcement) => (
                        <li key={announcement._id} className="bg-white p-2 rounded-lg shadow-md hover:scale-95 transform transition-all hover:bg-gray-100">
                            <div className="flex items-center space-x-6">
                                <p className="text-lg font-medium">{announcement.text}</p>
                                <p className="text-sm text-gray-900 ">Department: {announcement.department}</p>
                                <p className="text-sm text-gray-900">Posted by: {announcement.userName}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteAnnouncement(announcement._id)}
                                className="mt-0 text-red-600 hover:text-red-900 focus:outline-none"
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
