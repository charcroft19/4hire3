import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'student' | 'employer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredUserType }) => {
  const { user, userType, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to={userType === 'student' ? '/dashboard/student' : '/dashboard/employer'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;