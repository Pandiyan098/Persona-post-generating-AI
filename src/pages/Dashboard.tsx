import React from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[rgb(200,203,254)] p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
        <p className="text-gray-600 mb-8">
          This is your personalized dashboard based on your interests.
        </p>
        <button
          onClick={() => navigate('/interests')}
          className="bg-[var(--ube-600)] hover:bg-[var(--ube-800)] text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Edit Interests
        </button>
      </div>
    </div>
  );
};

export default Dashboard;