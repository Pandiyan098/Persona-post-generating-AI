import React from 'react';
import type { InputFieldProps } from '../types/authTypes';
// import '../styles/form.css';

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  error 
}) => {
  return (
    <div className="mb-4">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'input-field-error' : ''}`}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputField;