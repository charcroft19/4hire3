import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, DollarSign, Shield, Users, ArrowRight, Check } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Your Future <span className="text-blue-600">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect with local opportunities that fit your schedule. Join thousands of students building their future today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup/student"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <GraduationCap className="mr-2" size={24} />
              Start Your Journey
            </Link>
            <Link
              to="/signup/employer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
            >
              <Briefcase className="mr-2" size={24} />
              Post a Job
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:-translate-y-1 transition-all duration-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-600" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
            <p className="text-gray-600">Active Students</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:-translate-y-1 transition-all duration-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-green-600" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">$250K+</h3>
            <p className="text-gray-600">Earned by Students</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:-translate-y-1 transition-all duration-200">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-purple-600" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Verified Users</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">For Students</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Check className="text-green-600" size={16} />
                  </span>
                  Flexible work that fits your schedule
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Check className="text-green-600" size={16} />
                  </span>
                  Get paid quickly and securely
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Check className="text-green-600" size={16} />
                  </span>
                  Build your professional network
                </li>
              </ul>
              <Link
                to="/signup/student"
                className="mt-8 inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Join as a student
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">For Employers</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Check className="text-blue-600" size={16} />
                  </span>
                  Access verified university talent
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Check className="text-blue-600" size={16} />
                  </span>
                  Post jobs and hire quickly
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Check className="text-blue-600" size={16} />
                  </span>
                  Secure payment processing
                </li>
              </ul>
              <Link
                to="/signup/employer"
                className="mt-8 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Start hiring students
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join our community of students and employers making connections that matter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup/student"
              className="px-8 py-4 text-lg font-medium rounded-full bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
            >
              Sign Up as Student
            </Link>
            <Link
              to="/signup/employer"
              className="px-8 py-4 text-lg font-medium rounded-full bg-blue-700 text-white hover:bg-blue-800 transform hover:scale-105 transition-all duration-200"
            >
              Sign Up as Employer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;