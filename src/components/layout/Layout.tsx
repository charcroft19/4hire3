import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCircle, Menu, X, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import NotificationCenter from '../notifications/NotificationCenter';

const Layout = () => {
  const { user, userType, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = location.pathname.includes('/signup');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">4hire.xyz</Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/signup/student" className={`font-medium ${location.pathname === '/signup/student' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                Student Sign Up
              </Link>
              <Link to="/signup/employer" className={`font-medium ${location.pathname === '/signup/employer' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                Employer Sign Up
              </Link>
              <Link to="/faq" className="font-medium text-gray-600 hover:text-blue-600">
                FAQ
              </Link>
              <Link to="/about" className="font-medium text-gray-600 hover:text-blue-600">
                About Us
              </Link>
            </nav>
            <button className="md:hidden" onClick={toggleMenu}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-white py-4 px-4">
              <nav className="flex flex-col space-y-4">
                <Link to="/signup/student" className={`font-medium ${location.pathname === '/signup/student' ? 'text-blue-600' : 'text-gray-600'}`} onClick={toggleMenu}>
                  Student Sign Up
                </Link>
                <Link to="/signup/employer" className={`font-medium ${location.pathname === '/signup/employer' ? 'text-blue-600' : 'text-gray-600'}`} onClick={toggleMenu}>
                  Employer Sign Up
                </Link>
                <Link to="/faq" className="font-medium text-gray-600" onClick={toggleMenu}>
                  FAQ
                </Link>
                <Link to="/about" className="font-medium text-gray-600" onClick={toggleMenu}>
                  About Us
                </Link>
              </nav>
            </div>
          )}
        </header>
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">4hire.xyz</Link>
          <nav className="hidden md:flex items-center space-x-6">
            {!user && (
              <>
                <Link to="/faq" className="font-medium text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
                <Link to="/about" className="font-medium text-gray-600 hover:text-blue-600">
                  About Us
                </Link>
              </>
            )}
            {user ? (
              <>
                {userType === 'student' ? (
                  <>
                    <Link to="/dashboard/student" className={`font-medium ${location.pathname === '/dashboard/student' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                      Dashboard
                    </Link>
                    <Link to="/profile/student" className={`font-medium ${location.pathname === '/profile/student' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard/employer" className={`font-medium ${location.pathname === '/dashboard/employer' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                      Dashboard
                    </Link>
                    <Link to="/profile/employer" className={`font-medium ${location.pathname === '/profile/employer' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                      Profile
                    </Link>
                  </>
                )}
                <Link to="/messages" className="font-medium text-gray-600 hover:text-blue-600">
                  <MessageSquare size={20} />
                </Link>
                <NotificationCenter />
                <button 
                  onClick={logout}
                  className="font-medium text-gray-600 hover:text-blue-600"
                >
                  Log Out
                </button>
                <Link to={userType === 'student' ? '/profile/student' : '/profile/employer'} className="ml-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <UserCircle size={24} className="text-gray-500" />
                    )}
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/signup/student" className="font-medium text-gray-600 hover:text-blue-600">
                Sign Up / Login
              </Link>
            )}
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white py-4 px-4">
            <nav className="flex flex-col space-y-4">
              {user ? (
                <>
                  {userType === 'student' ? (
                    <>
                      <Link to="/dashboard/student" className={`font-medium ${location.pathname === '/dashboard/student' ? 'text-blue-600' : 'text-gray-600'}`} onClick={toggleMenu}>
                        Dashboard
                      </Link>
                      <Link to="/profile/student" className={`font-medium ${location.pathname === '/profile/student' ? 'text-blue-600' : 'text-gray-600'}`} onClick={toggleMenu}>
                        Profile
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard/employer" className={`font-medium ${location.pathname === '/dashboard/employer' ? 'text-blue-600' : 'text-gray-600'}`} onClick={toggleMenu}>
                        Dashboard
                      </Link>
                      <Link to="/profile/employer" className={`font-medium ${location.pathname === '/profile/employer' ? 'text-blue-600' : 'text-gray-600'}`} onClick={toggleMenu}>
                        Profile
                      </Link>
                    </>
                  )}
                  <Link to="/messages" className="font-medium text-gray-600" onClick={toggleMenu}>
                    Messages
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="font-medium text-gray-600 text-left"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/faq" className="font-medium text-gray-600" onClick={toggleMenu}>
                    FAQ
                  </Link>
                  <Link to="/about" className="font-medium text-gray-600" onClick={toggleMenu}>
                    About Us
                  </Link>
                  <Link to="/signup/student" className="font-medium text-gray-600" onClick={toggleMenu}>
                    Sign Up / Login
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;