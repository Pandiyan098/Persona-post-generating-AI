import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import type { AuthFormData } from '../types/authTypes';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/forgetpass.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.debug('Sending forgot password request with:', formData);

      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      console.debug('Raw response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Forgot password error response:', errorData);
        throw new Error(errorData.error || 'Password reset request failed');
      }

      const data = await response.json();
      console.log('Password reset email sent:', data);
      setSuccess('Password reset link has been sent to your email');
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(200,203,254)] p-4 forget-pass-container">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo />
        </div>
        <div className="auth-container">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="back-button"
          >
            <FiArrowLeft className="mr-1" />
            Back
          </button>
          
          <h1 className="auth-title">Reset your password</h1>
          <p className="auth-subtitle">
            Enter your email and we'll send you a link to reset your password
          </p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="auth-footer">
            Remember your password?{' '}
            <a href="/login" className="auth-link">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;