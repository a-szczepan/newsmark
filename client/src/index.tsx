import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import '../src/styles/global.css';
import '../src/styles/_global.scss';
import '../src/styles/variables.css';
import App from './App';
import { Layout } from './components/Layout/Layout';

ReactDOM.render(
  <Layout> 
    <RouterProvider router={router} />
    <App />
  </Layout>,
  document.getElementById('root')
);
