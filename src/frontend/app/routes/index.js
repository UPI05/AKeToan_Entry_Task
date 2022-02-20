import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './routes';

export default function renderRoute() {
  return (
    <Routes>
      {ROUTES.map(route => {
        return <Route key={route.path} path={route.path} element={route.component} />;
      })}
    </Routes>
  );
}
