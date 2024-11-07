import React, { useEffect, useState } from 'react';

function ProfilePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="p-10 bg-white rounded-lg shadow-xl text-center w-96">
                <h1 className="text-4xl font-bold mb-4 text-blue-700">My Profile</h1>
                <div className="space-y-4">
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Name: </span>{userData.name}
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Department: </span>{userData.department}
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Profession: </span>{userData.profession}
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Email: </span>{userData.email}
                    </div>
                </div>
                <button
                    className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => window.location.reload()}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
