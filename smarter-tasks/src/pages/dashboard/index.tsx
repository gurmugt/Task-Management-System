import React from 'react';

const Dashboard: React.FC = () => {
  const userDataString = localStorage.getItem('userData');
  let userData = null;

  try {
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
  } catch (error) {
    console.error('Error parsing userData:', error);
  }

  const handleLogOut = () => {
    localStorage.removeItem('userData');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>

        {userData && (
          <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <div className="border-t border-gray-300 pt-2">
              <div className="flex mb-1">
                <span className="font-semibold w-20">Name:</span>
                <p className="text-gray-600">{userData.name}</p>
              </div>
              <div className="flex mb-1">
                <span className="font-semibold w-20">Email:</span>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center w-1/3 justify-end mt-4">
          <a href="/signin" id='logout-link' onClick={handleLogOut} className="text-red-500 hover:text-red-600">
            Log Out
          </a>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
