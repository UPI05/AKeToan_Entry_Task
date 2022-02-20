import React from 'react';
import * as ROUTES from './constants';

// Components
import HomePage from '../containers/HomePage';
import TodoPage from '../containers/TodoPage';
import Page404 from '../containers/Page404';

// import x from '../components/NavBar';

const ROUTES_CONFIG = [
  /**
   * HOME REGION
   */
  {
    path: ROUTES.ROUTE_HOMEPAGE,
    component: <HomePage />,
  },
  /**
   * TODO LIST REGION
   */
  {
    path: ROUTES.ROUTE_TODOLIST,
    component: <TodoPage />,
  },
  /**
   * 404 REGION
   */
  {
    path: '*',
    component: <Page404 />,
  },
];

export default ROUTES_CONFIG;
