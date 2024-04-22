import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, Navigate, BrowserRouter, Route, Routes} from "react-router-dom"
import ErrorPage from "./error-page"
import BrowsePage from './pages/BrowsePage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccuntPage'
import ResetAccountPage from './pages/ResetAccountPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([{
  path: '/',
  element:<Navigate to="/browse"/>,
  errorElement: <ErrorPage/>
},
{
  path: '/browse',
  element: <BrowsePage/>
},
{
  path: '/login',
  element: <LoginPage/>
},
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
