import React, { useState, useEffect } from 'react';
import ProfilePage from './ProfilePage';

function HomePage() {
    const [showProfile, setShowProfile] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [announcementText, setAnnouncementText] = useState('');
    const [announcementDepartment, setAnnouncementDepartment] = useState('');
    const [announcementUserName, setAnnouncementUserName] = useState('');

    useEffect(() => {
        const announcementsData = [
            { id: 1, text: "New class timings.", department: "Civil Engineering", userName: "Ananth" },
            { id: 2, text: "Campus fest in nov!", department: "Cultural Fest", userName: "Alok" },
            { id: 3, text: "Online class on Saturday.", department: "Computer Science", userName: "Mayank Pandey" }
        ];
        setAnnouncements(announcementsData);
        setFilteredResults(announcementsData);
    }, []);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const results = announcements.filter(
            (announcement) =>
                announcement.text.toLowerCase().includes(lowercasedQuery) ||
                announcement.department.toLowerCase().includes(lowercasedQuery) ||
                announcement.userName.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredResults(results);
    }, [searchQuery, announcements]);

    const handleAnnouncementSubmit = (e) => {
        e.preventDefault();
        const newAnnouncement = {
            id: announcements.length + 1,
            text: announcementText,
            department: announcementDepartment,
            userName: announcementUserName,
        };
        setAnnouncements([newAnnouncement, ...announcements]);
        setFilteredResults([newAnnouncement, ...filteredResults]);
        setAnnouncementText('');
        setAnnouncementDepartment('');
        setAnnouncementUserName('');
    };

    if (showProfile) return <ProfilePage />;

    return (
        <div className="bg-blue-50 min-h-screen flex flex-col">
            <header className="bg-transparent sticky top-0 w-full py-4 px-6 shadow-md backdrop-blur-md">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://www.dotmagazine.online/_Resources/Persistent/7/c/7/a/7c7ab2423d2f340edfe42eb99461ff58f6e9a2ba/iStock-683542394-900x507-720x406.jpg"
                            alt="Profile Logo"
                            className="w-8 h-8 rounded-full hover:scale-105 transform transition duration-200" // Reduced scale to 1.05
                        />
                        <h1 className="text-2xl font-bold hover:text-blue-600 transition-colors duration-200">Smart Campus Connect</h1>
                    </div>
                    <div className="flex items-center space-x-6">
                        <input
                            type="text"
                            placeholder="Search announcements or users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 w-96 focus:outline-none focus:border-blue-500 transition duration-200"
                        />
                        <button
                            onClick={() => setShowProfile(true)}
                            className="text-gray-800 font-medium hover:text-blue-700 transition duration-200"
                        >
                            My Profile
                        </button>
                    </div>
                </nav>
            </header>

            <main className="flex-grow p-6">
                <h1 className="text-5xl font-bold text-center text-blue-700 mb-8 hover:text-blue-500 transition-colors duration-200">Welcome to Smart Campus Connect!</h1>

                <section id="announcement-form" className="my-8 p-6 bg-white shadow rounded hover:shadow-lg transition-shadow duration-200 transform hover:scale-102"> {/* Reduced scale to 1.02 */}
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Make a New Announcement</h2>
                    <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Announcement Text"
                            value={announcementText}
                            onChange={(e) => setAnnouncementText(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 transition duration-200"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Department"
                            value={announcementDepartment}
                            onChange={(e) => setAnnouncementDepartment(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 transition duration-200"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={announcementUserName}
                            onChange={(e) => setAnnouncementUserName(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 transition duration-200"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 transform hover:scale-102" // Reduced scale to 1.02
                        >
                            Post Announcement
                        </button>
                    </form>
                </section>

                <section id="announcements" className="my-8">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-4">Announcements Feed</h2>
                    {filteredResults.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredResults.map((item) => (
                                <li
                                    key={item.id}
                                    className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow duration-200 transform hover:scale-102" // Reduced scale to 1.02
                                >
                                    <p className="text-lg font-semibold hover:text-blue-500 transition-colors duration-200">{item.text}</p>
                                    <p className="text-gray-500">
                                        Department: {item.department} | Posted by: {item.userName}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-700">No results found.</p>
                    )}
                </section>
            </main>

            <footer className="bg-blue-200 text-center py-4 text-gray-700 hover:text-gray-900 transition duration-200">
                &copy; {new Date().getFullYear()} Smart Campus Connect. All rights reserved.
            </footer>
        </div>
    );
}

export default HomePage;
