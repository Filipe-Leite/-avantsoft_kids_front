import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import * as URL from '../app/api/requestRequirements';
import SignIn from '../app/pages/public/authentication/SignIn';
import SignUp from '../app/pages/public/authentication/SignUp';
import PersistLogin from '../features/session/PersistLogin';
import ResponsiveAppBar from '../app/components/appbar/ResponsiveAppBar';
import FirstLevelIndexSearch from '../app/pages/private/business/FirstLevelIndexSearch';
import SecondLevelIndexSearch from '../app/pages/private/business/SecondLevelIndexSearch';
import ThirdLevelIndexSearch from '../app/pages/private/business/ThirdLevelIndexSearch';

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
                <Route path={URL.THIRD_LEVEL_INDEX_SEARCH_ENDPOINT} element={
                  <PrivateRoute>
                      <ThirdLevelIndexSearch />
                  </PrivateRoute>
                } />
              </Route> 


              <Route element={<PersistLogin/>}>
                <Route path={URL.SECOND_LEVEL_INDEX_SEARCH_ENDPOINT} element={
                  <PrivateRoute>
                        <SecondLevelIndexSearch />
                  </PrivateRoute>
                } />
              </Route> 

              <Route element={<PersistLogin/>}>
                <Route path={URL.FIRST_LEVEL_INDEX_SEARCH_ENDPOINT} element={
                  <PrivateRoute>
                    <FirstLevelIndexSearch />
                  </PrivateRoute>
                } />
              </Route> 

              <Route path={'/'} element={
                  <PrivateRoute>
                    <FirstLevelIndexSearch/>
                  </PrivateRoute>
                } />
              </Routes>
          </BrowserRouter>
  );
}

export default RoutesApp;