import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import * as URL from '../app/api/requestRequirements';
import SignIn from '../app/pages/authentication/SignIn';
import SignUp from '../app/pages/authentication/SignUp';

function RoutesApp() {

  return (
          <BrowserRouter>
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
            </Routes>
          </BrowserRouter>
  );
}

export default RoutesApp;