import { JSX, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../app/store';
import { authenticateUserFromStorage } from '../features/session/sessionSlice';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const currentUser = useSelector((state: RootState) => state.session.currentUser);
  const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
  const loading = useSelector((state: RootState) => state.session.loading);
  const location = useLocation();
  const fromLocation = (location.state as any)?.from || { pathname: '/auth/sign_in' };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(authenticateUserFromStorage());

      // const fetchUserMoreInfo = async () => {
      //   if (authHeaders && currentUser && currentUser.nickname) {
      //     try {
      //       await dispatch(
      //         getUserGenericConfig({
      //           authHeaders,
      //           userNickname: currentUser.nickname,
      //         })
      //       );
      //     } catch (error) {
      //       console.error("Error fetching user info:", error);
      //     }
      //   }
      // };

      // fetchUserMoreInfo();
      
  }, [children,dispatch]);

  if (loading) {
    return <h2>Loading</h2>
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to={fromLocation} state={{ from: location }} replace />;
}

export default PrivateRoute;