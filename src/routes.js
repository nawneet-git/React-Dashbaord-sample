import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/DashboardView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
    ]
  }
];

export default routes;
