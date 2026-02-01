import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const username = localStorage.getItem('username');

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
