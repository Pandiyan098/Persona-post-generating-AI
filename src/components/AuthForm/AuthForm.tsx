import React, { useState } from 'react';
import InputField from '../InputField';
import Button from '../Button';
import type { AuthFormProps } from '../../types/authTypes';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './index.css';

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  formData,
  handleChange,
  handleSubmit,
  isLogin,
  error,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-container-wrapper">
  <div className="auth-container">
    <h1 className="auth-title">{title}</h1>
    {subtitle && <p className="auth-subtitle">{subtitle}</p>}

      {error && <div className="error-message mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        )}
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        
        <div className="input-container">
          <label className="input-label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input-field !pr-10"
            />
            <span 
              className="pass-visibality absolute right-3 left-3 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--text--tertiary)] hover:text-[var(--text--secondary)]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </span>
          </div>
        </div>

        {!isLogin && (
          <div className="input-container">
            <label className="input-label">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="input-field !pr-10"
              />
              <span 
                className="absolute right-3 left-3 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--text--tertiary)] hover:text-[var(--text--secondary)]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
            </div>
          </div>
        )}

        {/* Rest of your form remains the same */}
        {isLogin && (
          <div className="flex justify-end mb-4">
            <a href="/forgot-password" className="text-sm auth-link">
              Forgot password?
            </a>
          </div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : title}
        </Button>
      </form>

      {/* Rest of your component remains the same */}
      <div className="divider">OR</div>
      
      <div className="space-y-3">
        {/* Social buttons */}
      </div>

      <div className="mt-6 text-center text-sm">
        {isLogin ? (
          <>Don't have an account? <a href="/signup" className="auth-link">Sign up</a></>
        ) : (
          <>Already have an account? <a href="/login" className="auth-link">Log in</a></>
        )}
      </div>
      </div>
    </div>
  );
};

export default AuthForm;