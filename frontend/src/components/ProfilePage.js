import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage({ profileData }) {
  const navigate = useNavigate();

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex items-center justify-center text-center p-4">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-sm transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mt-3">
          My Profile
        </h1>

        <div className="flex flex-col space-y-4 text-left mt-6">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Name:</p>
            <p className="text-lg text-gray-900">{profileData.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Department:</p>
            <p className="text-lg text-gray-900">{profileData.department}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Profession:</p>
            <p className="text-lg text-gray-900">{profileData.profession}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Email:</p>
            <p className="text-lg text-gray-900">{profileData.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            navigate('/home');
            window.location.reload();  // Force the page to reload
          }}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
