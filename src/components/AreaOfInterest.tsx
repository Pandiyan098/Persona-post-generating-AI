import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
// import '../styles/interest.css';
// import '../styles/button.css';

interface AreaOfInterestProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  color?: string;
  initiallySelected?: boolean;
  onSelect?: (selected: boolean) => void;
}

const AreaOfInterest: React.FC<AreaOfInterestProps> = ({ 
  title, 
  // description, 
  icon,
  color = 'var(--ube-600)',
  initiallySelected = false,
  onSelect
}) => {
  const [selected, setSelected] = useState(initiallySelected);

  const handleClick = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    if (onSelect) {
      onSelect(newSelected);
    }
  };

  return (
    <div 
      className={`interest-card ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div 
        className="interest-icon" 
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <h3 className="interest-title">{title}</h3>
      {/* <p className="interest-description">{description}</p> */}
      {selected && (
        <div className="selected-badge">
          <FiCheck className="check-icon" />
        </div>
      )}
    </div>
  );
};

export default AreaOfInterest;