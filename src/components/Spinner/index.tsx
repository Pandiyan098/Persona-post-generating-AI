import { useState, useEffect } from 'react';
import './index.css'; // We'll create this next

const SixHandSpinner = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360); // Adjust speed by changing increment value
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="spinner-container">
      <div className="spinner" style={{ transform: `rotate(${rotation}deg)` }}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="spinner-hand"
            style={{ 
              transform: `rotate(${i * 60}deg)`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      <div className="purple-underline"></div>
    </div>
  );
};

export default SixHandSpinner;