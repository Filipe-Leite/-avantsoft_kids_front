import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../app/store';

function PublicOnlyRoute({ children  } : any) {
  const currentUser = useSelector((state : RootState) => state.session.currentUser);
  const location = useLocation();
  // const [PRIVATE_ROUTES, setPrivateRoutes] = useState<REQUEST_REQUIREMENTS.EndPoints>();
  const loading = useSelector((state: RootState) => state.session.loading);
  const userValidated = useSelector((state: RootState) => state.session.loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser){

        const routeParams={
          userNickname: currentUser.nickname
      }

      // const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: routeParams});

      setPrivateRoutes(PRIVATE_ROUTES);
    }

          
    if (userValidated && PRIVATE_ROUTES?.HOME) {
      navigate(PRIVATE_ROUTES?.HOME);
    }
  }, [currentUser])

  if (loading && currentUser){
    return <h2>Loading</h2>
  }
  else if (!currentUser) {
      return children;
  } else if (currentUser && PRIVATE_ROUTES && PRIVATE_ROUTES.HOME !== undefined ) {
    return <Navigate to={PRIVATE_ROUTES.HOME} state={{from: location}} replace/>;
  } else {
      return <p>Something went wrong</p>;
  }
}

export default PublicOnlyRoute