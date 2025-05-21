import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UniversityLogo from '../../components/common/UniversityLogo';
import { ChevronRight, Check, Mail, Lock } from 'lucide-react';

function SignUpStudent() {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup, login, isLoading } = useAuth();

  const validDomains = ["colorado.edu", "colostate.edu", "sdsu.edu"];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password, 'student');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const domain = email.split('@')[1];
      if (!validDomains.includes(domain)) {
        setError("Email must be from colorado.edu, colostate.edu, or sdsu.edu");
        return;
      }
    }
    if (step === 3 && !agreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    if (step === 3) {
      try {
        await signup({ email, username, password }, 'student');
      } catch (err: any) {
        if (err.message?.includes('already registered') || err.message?.includes('already exists')) {
          setError("An account with this email already exists. Please log in instead.");
          setIsLogin(true);
          return;
        }
        setError(err.message || "Signup failed. Please try again.");
      }
      return;
    }
    setError('');
    setStep(step + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="bg-blue-600 p-6">
        <h2 className="text-2xl font-bold text-white text-center">
          {isLogin ? 'Student Login' : 'Student Sign Up'}
        </h2>
        {!isLogin && (
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'}`}>
              {step > 1 ? <Check size={16} /> : 1}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-white' : 'bg-blue-400'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'}`}>
              {step > 2 ? <Check size={16} /> : 2}
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-white' : 'bg-blue-400'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'}`}>
              3
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                University Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="yourname@university.edu"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">University Email</span>
                  <div className="mt-1 relative">
                    <input
                      type="email"
                      placeholder="yourname@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {email && email.includes('@') && (
                      <div className="absolute right-2 top-2">
                        <UniversityLogo domain={email.split('@')[1]} />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Must be from colorado.edu, colostate.edu, or sdsu.edu</p>
                </label>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Username</span>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Password</span>
                  <input
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900">Terms and Conditions</h3>
                  <div className="mt-2 text-sm text-gray-600 h-40 overflow-y-auto p-2 border border-gray-200 rounded">
                    <p>By signing up for UniJobs, you agree to our terms of service, privacy policy, and student code of conduct. This includes:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Maintaining academic integrity while working</li>
                      <li>Treating employers with respect and professionalism</li>
                      <li>Completing agreed-upon work to the best of your ability</li>
                      <li>Providing honest reviews of employers</li>
                      <li>Allowing UniJobs to verify your student status</li>
                    </ul>
                  </div>
                </div>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-gray-700">I agree to the terms & conditions</span>
                </label>
              </div>
            )}
            
            {error && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            
            <div className="mt-6">
              <button
                onClick={nextStep}
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{step === 3 ? (isLoading ? 'Creating Account...' : 'Create Account') : 'Next'}</span>
                {step !== 3 && <ChevronRight size={16} className="ml-1" />}
              </button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Log In
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUpStudent;