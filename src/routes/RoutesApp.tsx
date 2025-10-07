import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import * as URL from '../app/api/requestRequirements';
import SignIn from '../app/pages/public/authentication/SignIn';
import SignUp from '../app/pages/public/authentication/SignUp';
import Home from '../app/pages/private/business/Home';
import PersistLogin from '../features/session/PersistLogin';
import ResponsiveAppBar from '../app/components/appbar/ResponsiveAppBar';

function RoutesApp() {

  return (
          <BrowserRouter>
            <ResponsiveAppBar/>
            <Routes>
              <Route path={URL.SIGNIN_ENDPOINT} element={
                <PublicOnlyRoute>
                  <SignIn />
                </PublicOnlyRoute>
              } />

              <Route path={URL.SIGNUP_ENDPOINT} element={
                <PublicOnlyRoute>
                  <SignUp />
                </PublicOnlyRoute>
              } />

              <Route element={<PersistLogin/>}>
                <Route path={URL.HOME} element={
                  <PrivateRoute>
                        <Home />
                  </PrivateRoute>
                } />
              </Route> 

              <Route path={'/'} element={
                  <PrivateRoute>
                    <Home/>
                  </PrivateRoute>
                } />
              </Routes>
          </BrowserRouter>
  );
}

export default RoutesApp;