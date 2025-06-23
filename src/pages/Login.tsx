import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import Logo from '../components/Logo';
import type { AuthFormData } from '../types/authTypes';

// import '../styles/auth.css';
// import '../styles/form.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log('Login successful:', formData);
  //     navigate('/interests'); // Redirect to interests page
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      console.debug('Sending login request with:', formData);
  
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.debug('Raw response:', response);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error response:', errorData);
        throw new Error(errorData.error || 'Login failed');
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
  
      // Optional: Save interests or user info to localStorage/state
      localStorage.setItem('userName', JSON.stringify(data.username));
      localStorage.setItem('interests', JSON.stringify(data.interests));
  
      // Navigate to the next page
      navigate('/interests');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(200,203,254)]">
  <div className="w-full max-w-md p-6">
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <Logo />
      </div>
      <AuthForm
        title="Log in to Persona AI"
        subtitle="Welcome back! Please enter your details."
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLogin={true}
        error={error}
        isLoading={isLoading}
      />
    </div>
  </div>
</div>


  );
};

export default Login;