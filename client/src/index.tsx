import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import App from './App';

ReactDOM.render(
  <>
    <RouterProvider router={router} />
    <App />
  </>,
  document.getElementById('root')
);
