import { useAuth } from './useAuth';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children, requiredRole, onRequireLogin }) => {
  const { user } = useAuth();

  if (!user) {
    onRequireLogin?.(); // trigger login modal
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AuthRoute;