import { Router } from '@remix-run/router';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

export const router: Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: []
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  }
]);
