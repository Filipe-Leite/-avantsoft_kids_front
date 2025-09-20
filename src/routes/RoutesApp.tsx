import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

function RoutesApp() {

  return (
          <BrowserRouter>
            <Routes>

            </Routes>
          </BrowserRouter>
  );
}

export default RoutesApp;