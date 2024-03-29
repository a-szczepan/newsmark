import { Router } from '@remix-run/router';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import BrowseArticles from '../pages/BrowseArticles/BrowseArticles';
import { ArticlePage } from '../pages/ArticlePage/ArticlePage';
import { UserPage } from '../pages/UserPage/UserPage';

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
  },
  {
    path: 'articles',
    element: <BrowseArticles />
  },
  {
    path: 'article',
    element: <ArticlePage />
  },
  {
    path: 'user',
    element: <UserPage />
  }
]);
