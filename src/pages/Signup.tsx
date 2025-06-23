// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthForm from '../components/AuthForm';
// import Logo from '../components/Logo';
// import type { AuthFormData } from '../types/authTypes';
// import { FiCode, FiPieChart, FiShield, FiCpu, FiDatabase, FiLock } from 'react-icons/fi';
// import AreaOfInterest from '../components/AreaOfInterest';

// // import '../styles/auth.css';
// // import '../styles/form.css';
// // import '../styles/interest.css';
// // import '../styles/button.css';

// const Signup: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<AuthFormData>({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     interests: []
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [currentStep, setCurrentStep] = useState<'signup' | 'interests'>('signup');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleInterestSelect = (title: string, isSelected: boolean) => {
//     setFormData(prev => {
//       const interests = prev.interests ?? [];
//       const newInterests = isSelected
//         ? [...interests, title]
//         : interests.filter(i => i !== title);
//       return { ...prev, interests: newInterests };
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     if (currentStep === 'signup') {
//       if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//         setError('All fields are required');
//         setIsLoading(false);
//         return;
//       }
//       if (formData.password !== formData.confirmPassword) {
//         setError("Passwords don't match");
//         setIsLoading(false);
//         return;
//       }
//       setCurrentStep('interests');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           interests: formData.interests
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Signup failed');
//       }

//       navigate('/login');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[rgb(200,203,254)] py-8 px-4">
//       <div className="max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <Logo />
//         </div>

//         {currentStep === 'signup' ? (
//           <div className="bg-white rounded-xl p-6 shadow-lg">
//             <AuthForm
//               title="Create your Persona AI account"
//               subtitle="Get started with your AI companion"
//               formData={formData}
//               handleChange={handleChange}
//               handleSubmit={handleSubmit}
//               isLogin={false}
//               error={error}
//               isLoading={isLoading}
//             />
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h1 className="text-2xl font-bold text-center mb-2 text-[var(--primary-purple)] area-of-interest-title">
//                 Select Your Areas of Interest
//               </h1>
//               <p className="text-center text-[var(--text--tertiary)] mb-6 area-of-interest-subtitle">
//                 Choose topics you're interested in to personalize your experience
//               </p>

//               <div className="area-of-interest-container space-y-4">
//                 <AreaOfInterest
//                   title="AI Development"
//                   description="Build intelligent systems and machine learning models"
//                   icon={<FiCode size={20} />}
//                   color="var(--primary-purple)"
//                   onSelect={(selected) => handleInterestSelect("AI Development", selected)}
//                 />
//                 <AreaOfInterest
//                   title="Data Analysis"
//                   description="Extract insights from complex datasets"
//                   icon={<FiPieChart size={20} />}
//                   color="var(--ube-440)"
//                   onSelect={(selected) => handleInterestSelect("Data Analysis", selected)}
//                 />
//                 <AreaOfInterest
//                   title="Cybersecurity"
//                   description="Protect systems and networks from digital attacks"
//                   icon={<FiShield size={20} />}
//                   color="var(--mint-1000)"
//                   onSelect={(selected) => handleInterestSelect("Cybersecurity", selected)}
//                 />
//                 <AreaOfInterest
//                   title="Machine Learning"
//                   description="Develop algorithms that learn from data"
//                   icon={<FiCpu size={20} />}
//                   color="var(--ube-600)"
//                   onSelect={(selected) => handleInterestSelect("Machine Learning", selected)}
//                 />
//                 <AreaOfInterest
//                   title="Big Data"
//                   description="Work with extremely large and complex datasets"
//                   icon={<FiDatabase size={20} />}
//                   color="var(--blueberry-500)"
//                   onSelect={(selected) => handleInterestSelect("Big Data", selected)}
//                 />
//                 <AreaOfInterest
//                   title="Privacy"
//                   description="Ensure proper data handling and protection"
//                   icon={<FiLock size={20} />}
//                   color="var(--purple-700)"
//                   onSelect={(selected) => handleInterestSelect("Privacy", selected)}
//                 />
//               </div>

//               {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
//             </div>

//             <div className="button-wrapper flex space-x-4">
//               <button
//                 onClick={() => setCurrentStep('signup')}
//                 className="back-btn flex-1 border border-[var(--border-primary)] text-[var(--text--secondary)] rounded-lg hover:bg-[var(--fog-400)] transition-colors"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={(formData.interests?.length ?? 0) === 0 || isLoading}
//                 // className={`continue-btn flex-1 py-3 bg-[var(--ube-600)] text-white rounded-lg hover:bg-[var(--ube-800)] transition-colors ${
//                 className={`continue-btn ${
//                   (formData.interests?.length ?? 0) === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isLoading ? (
//                   <span className="inline-flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating account...
//                   </span>
//                 ) : (
//                   `Continue with ${formData.interests?.length || 0} selected`
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import Logo from '../components/Logo';
import type { AuthFormData } from '../types/authTypes';
import { FiCpu, FiImage, FiMusic, FiCamera, FiFeather, FiHeart } from 'react-icons/fi';
import { FaTshirt ,FaTree} from "react-icons/fa";
import { GiCook, GiGamepad, GiRunningShoe,GiLipstick, } from 'react-icons/gi';
import AreaOfInterest from '../components/AreaOfInterest';
import'../styles/signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState<'signup' | 'interests'>('signup');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleInterestSelect = (title: string, isSelected: boolean) => {
    setFormData(prev => {
      const interests = prev.interests ?? [];
      const newInterests = isSelected
        ? [...interests, title]
        : interests.filter(i => i !== title);
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (currentStep === 'signup') {
      // Validate all fields are filled
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required');
        setIsLoading(false);
        return;
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Validate password strength
      if (!validatePassword(formData.password)) {
        setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
        setIsLoading(false);
        return;
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        setIsLoading(false);
        return;
      }

      setCurrentStep('interests');
      setIsLoading(false);
      return;
    }

    // Submit with interests
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          interests: formData.interests
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(200,203,254)] py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Logo />
        </div>

        {currentStep === 'signup' ? (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <AuthForm
              title="Create your Persona AI account"
              subtitle="Get started with your AI companion"
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLogin={false}
              error={error}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h1 className="text-2xl font-bold text-center mb-2 text-[var(--primary-purple)] area-of-interest-title">
                Select Your Areas of Interest
              </h1>
              <p className="text-center text-[var(--text--tertiary)] mb-6 area-of-interest-subtitle">
                Choose topics you're interested in to personalize your experience
              </p>

              <div className="area-of-interest-container space-y-4">
                <AreaOfInterest
                  title="Artificial Intelligence & Machine Learning"
                  description="Explore AI algorithms, neural networks, and intelligent systems"
                  icon={<FiCpu size={20} />}
                  color="var(--primary-purple)"
                  onSelect={(selected) => handleInterestSelect("Artificial Intelligence & Machine Learning", selected)}
                />
                <AreaOfInterest
                  title="Drawing & Painting"
                  description="Develop artistic skills in various visual mediums"
                  icon={<FiImage size={20} />}
                  color="var(--ube-440)"
                  onSelect={(selected) => handleInterestSelect("Drawing & Painting", selected)}
                />
                <AreaOfInterest
                  title="Cooking & Culinary Arts"
                  description="Master cooking techniques and culinary creativity"
                  icon={<GiCook size={20} />}
                  color="var(--mint-1000)"
                  onSelect={(selected) => handleInterestSelect("Cooking & Culinary Arts", selected)}
                />
                <AreaOfInterest
                  title="Fitness & Wellness"
                  description="Focus on physical health, workouts, mental well-being, and self-care"
                  icon={<FiHeart size={20} />}
                  color="var(--ube-600)"
                  onSelect={(selected) => handleInterestSelect("Fitness & Wellness", selected)}
                />
                <AreaOfInterest
                  title="Music Production & Instruments"
                  description="Create music and learn to play instruments"
                  icon={<FiMusic size={20} />}
                  color="var(--blueberry-500)"
                  onSelect={(selected) => handleInterestSelect("Music Production & Instruments", selected)}
                />
                <AreaOfInterest
                  title="Photography & Videography"
                  description="Capture moments and tell stories through visuals"
                  icon={<FiCamera size={20} />}
                  color="var(--purple-700)"
                  onSelect={(selected) => handleInterestSelect("Photography & Videography", selected)}
                />
                <AreaOfInterest
                  title="Gaming & Game Development"
                  description="Play and create interactive digital experiences"
                  icon={<GiGamepad size={20} />}
                  color="var(--primary-purple)"
                  onSelect={(selected) => handleInterestSelect("Gaming & Game Development", selected)}
                />
                <AreaOfInterest
                  title="Sports & Outdoor Activities"
                  description="Engage in physical activities and adventure sports"
                  icon={<GiRunningShoe size={20} />}
                  color="var(--ube-440)"
                  onSelect={(selected) => handleInterestSelect("Sports & Outdoor Activities", selected)}
                />
                <AreaOfInterest
                  title="Writing & Storytelling"
                  description="Express ideas through words and narrative techniques"
                  icon={<FiFeather size={20} />}
                  color="var(--mint-1000)"
                  onSelect={(selected) => handleInterestSelect("Writing & Storytelling", selected)}
                />
                <AreaOfInterest
                  title="Sustainability & Environment"
                  description="Learn about eco-friendly practices and conservation"
                  icon={<FaTree size={20} />}
                  color="var(--ube-1101)"
                  onSelect={(selected) => handleInterestSelect("Sustainability & Environment", selected)}
                />

                <AreaOfInterest
                  title="Makeup & Beauty"
                  description="Enhance looks and express creativity through makeup and beauty"
                  icon={<GiLipstick size={20} />}
                  color="var(--pink-500)"
                  onSelect={(selected) => handleInterestSelect("Makeup & Beauty", selected)}
                />

                <AreaOfInterest
                  title="Clothing Design"
                  description="Craft styles and set trends with your fashion creations"
                  icon={<FaTshirt size={20} />}
                  color="var(--violet-600)"
                  onSelect={(selected) => handleInterestSelect("Clothing Design", selected)}
                />
                  </div>

              {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
            </div>

            <div className="button-wrapper flex space-x-4">
              <button
                onClick={() => setCurrentStep('signup')}
                className="back-btn flex-1 border border-[var(--border-primary)] text-[var(--text--secondary)] rounded-lg hover:bg-[var(--fog-400)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={(formData.interests?.length ?? 0) === 0 || isLoading}
                className={`continue-btn flex-1 py-3 bg-[var(--ube-600)] text-white rounded-lg hover:bg-[var(--ube-800)] transition-colors ${
                  (formData.interests?.length ?? 0) === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="inline-flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  `Continue with ${formData.interests?.length || 0} selected`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;