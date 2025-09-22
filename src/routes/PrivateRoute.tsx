import { JSX, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../app/store';
import { authenticateUserFromStorage } from '../features/session/sessionSlice';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const currentUser = useSelector((state: RootState) => state.session.currentUser);
  const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
  const loggedIn = useSelector((state: RootState) => state.session.loggedIn);
  const loading = useSelector((state: RootState) => state.session.loading);
  const location = useLocation();
  const fromLocation = (location.state as any)?.from || { pathname: '/auth/login' };
  const dispatch = useDispatch<AppDispatch>();

  if (loading) {
    return <h2>Loading</h2>
  }

  return loggedIn ? children : <Navigate to={fromLocation} state={{ from: location }} replace />;  
}

export default PrivateRoute;