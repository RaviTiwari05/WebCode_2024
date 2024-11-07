import React from 'react';
 
 
function ProfilePage({ profileData }) {
    if (!profileData) return <div>Loading...</div>;
    
     

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">User Profile</h1>
                <p className="text-lg">
                    <strong>Name:</strong> {profileData.name}
                </p>
                <p className="text-lg">
                    <strong>Department:</strong> {profileData.department}
                </p>
                <p className="text-lg">
                    <strong>Profession:</strong> {profileData.profession}
                </p>
                <p className="text-lg">
                    <strong>Email:</strong> {profileData.email}
                </p>
                 
            </div> 
               
         
        </div>
    );
}

export default ProfilePage;
