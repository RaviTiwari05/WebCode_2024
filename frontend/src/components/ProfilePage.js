import React from 'react';

function ProfilePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="p-10 bg-white rounded-lg shadow-xl text-center w-96">
                <h1 className="text-4xl font-bold mb-4 text-blue-700">My Profile</h1>
                <div className="space-y-4">
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Name: </span>Ananth
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Department: </span>Civil Engineering
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Profession: </span>Student
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
