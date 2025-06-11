import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

interface Props {
  children: JSX.Element;
}

function ProtectedRoute({ children }: Props) {
  const user = useUser();

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return children;
}

export default ProtectedRoute;
