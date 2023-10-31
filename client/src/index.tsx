import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import '../src/styles/global.css';
import '../src/styles/_global.scss';
import '../src/styles/variables.css';
import { Layout } from './components/Layout/Layout';

ReactDOM.render(
  <Layout>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Layout>,
  document.getElementById('root')
);
