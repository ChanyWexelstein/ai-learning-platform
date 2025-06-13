import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

interface Props {
  children: JSX.Element;
  requiredRole?: string;
}

function ProtectedRoute({ children, requiredRole }: Props) {
  const user = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
