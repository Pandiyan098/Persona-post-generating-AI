import React, { useState } from 'react';
import AreaOfInterest from '../../components/AreaOfInterest';
import Navbar from '../../components/Navbar';
import { FiCode, FiPieChart, FiMusic, FiCamera, FiBook, FiGlobe } from 'react-icons/fi';
import './index.css'; // We'll create this next

const InterestsPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestSelect = (title: string, selected: boolean) => {
    if (selected) {
      setSelectedInterests(prev => [...prev, title]);
    } else {
      setSelectedInterests(prev => prev.filter(item => item !== title));
    }
  };

  const interests = [
    { title: 'Technology', icon: <FiCode size={24} />, color: '#3b82f6' },
    { title: 'Business', icon: <FiPieChart size={24} />, color: '#10b981' },
    { title: 'Music', icon: <FiMusic size={24} />, color: '#8b5cf6' },
    { title: 'Photography', icon: <FiCamera size={24} />, color: '#ec4899' },
    { title: 'Literature', icon: <FiBook size={24} />, color: '#f59e0b' },
    { title: 'Travel', icon: <FiGlobe size={24} />, color: '#6366f1' },
  ];

  return (
    <div className="interests-page">
      <Navbar />
      
      <main className="interests-container">
        <header className="interests-header">
          <h1>Select Your Interests</h1>
          <p>Choose at least 3 areas to personalize your experience</p>
        </header>
        
        <div className="interests-grid">
          {interests.map((interest) => (
            <AreaOfInterest
              key={interest.title}
              title={interest.title}
              icon={interest.icon}
              color={interest.color}
              initiallySelected={selectedInterests.includes(interest.title)}
              onSelect={(selected) => handleInterestSelect(interest.title, selected)}
            />
          ))}
        </div>
        
        <button 
          className={`continue-button ${selectedInterests.length >= 3 ? 'active' : ''}`}
          disabled={selectedInterests.length < 3}
        >
          Continue
        </button>
      </main>
    </div>
  );
};

export default InterestsPage;