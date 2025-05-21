import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  
  const faqs: FAQ[] = [
    {
      question: "How do I verify my university email?",
      answer: "During sign up, enter your .edu email address from one of our supported universities. We'll verify your email domain automatically. Currently we support colorado.edu, colostate.edu, and sdsu.edu domains.",
      category: "Account"
    },
    {
      question: "How do payments work?",
      answer: "Employers post jobs with their budget. Once a job is completed and both parties are satisfied, payment is processed through our secure payment system. We're currently implementing Stripe for secure payments.",
      category: "Payments"
    },
    {
      question: "What if I have an issue with an employer?",
      answer: "If you have a problem with an employer, we encourage you to first try to resolve it directly. If that doesn't work, you can report the employer through your dashboard, and our support team will investigate.",
      category: "Jobs"
    },
    {
      question: "Can I post jobs for academic work?",
      answer: "No, UniJobs does not support posting or accepting academic work that violates academic integrity policies. Jobs should be for non-academic tasks like yard work, moving, tech help, etc.",
      category: "Jobs"
    },
    {
      question: "How are reviews handled?",
      answer: "After a job is completed, both students and employers can leave reviews for each other. These reviews help build trust in the community and provide valuable feedback for future jobs.",
      category: "Reviews"
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we take privacy very seriously. We only share the minimum information needed between students and employers to facilitate job connections. Your payment information and personal details are securely stored.",
      category: "Privacy"
    }
  ];
  
  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };
  
  const categories = [...new Set(faqs.map(faq => faq.category))];
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleNewQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your question: "${newQuestion}". Our team will review it and add it to our FAQ if needed.`);
    setNewQuestion('');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
        <p className="text-gray-600 mt-2">
          Find answers to common questions about UniJobs
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(category)}
              className={`py-2 px-4 rounded-md border text-center ${
                searchQuery === category 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={18} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-700">{faq.answer}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No FAQs found for "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-2 text-blue-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Can't find what you're looking for?</h2>
        <p className="text-gray-600 mb-4">
          If you have a question that's not covered in our FAQ, please submit it below and we'll get back to you.
        </p>
        
        <form onSubmit={handleNewQuestion}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              Your Question
            </label>
            <textarea
              id="question"
              rows={3}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default FAQPage;