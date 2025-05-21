import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Mail, Lock } from 'lucide-react';

function SignUpEmployer() {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Mock successful login
      navigate('/dashboard/employer');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      if (!email || !name) {
        setError("Please fill out all fields");
        return;
      }
    }
    
    if (step === 2) {
      if (age < 18) {
        setError("You must be at least 18 years old");
        return;
      }
      if (!password) {
        setError("Please create a password");
        return;
      }
    }
    
    if (step === 3 && !agreed) {
      setError("You must agree to the terms and conditions");
      return;
    }
    
    if (step === 3) {
      try {
        // Mock successful signup
        navigate('/dashboard/employer');
      } catch (err) {
        setError("Signup failed. Please try again.");
      }
      return;
    }
    
    setError('');
    setStep(step + 1);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="bg-green-600 p-6">
        <h2 className="text-2xl font-bold text-white text-center">
          {isLogin ? 'Employer Login' : 'Employer Sign Up'}
        </h2>
        {!isLogin && (
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-green-600' : 'bg-green-400 text-white'}`}>
              {step > 1 ? <Check size={16} /> : 1}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-white' : 'bg-green-400'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-green-600' : 'bg-green-400 text-white'}`}>
              {step > 2 ? <Check size={16} /> : 2}
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-white' : 'bg-green-400'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-white text-green-600' : 'bg-green-400 text-white'}`}>
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
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Log In
            </button>
            
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-green-600 hover:text-green-800"
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
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Full Name</span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </label>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Age</span>
                  <input
                    type="number"
                    min="18"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">You must be at least 18 years old</p>
                </label>
                <label className="block">
                  <span className="text-gray-700">Password</span>
                  <input
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </label>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900">Terms and Conditions</h3>
                  <div className="mt-2 text-sm text-gray-600 h-40 overflow-y-auto p-2 border border-gray-200 rounded">
                    <p>By signing up for UniJobs as an employer, you agree to our terms of service, privacy policy, and employer code of conduct. This includes:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Providing fair compensation for work performed</li>
                      <li>Treating students with respect and professionalism</li>
                      <li>Providing clear job descriptions and expectations</li>
                      <li>Paying students promptly upon completion of work</li>
                      <li>Providing honest reviews of student workers</li>
                    </ul>
                  </div>
                </div>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
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
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <span>{step === 3 ? 'Create Account' : 'Next'}</span>
                {step !== 3 && <ChevronRight size={16} className="ml-1" />}
              </button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-green-600 hover:text-green-800"
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

export default SignUpEmployer;