import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const ManageLanguages = React.lazy(() => import('./views/manageLanguages'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/checkLanguages', exact: true,  name: 'Check Languages', component: ManageLanguages },
];

export default routes;
