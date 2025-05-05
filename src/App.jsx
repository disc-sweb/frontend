import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  PrivateRoute,
  PublicOnlyRoute,
} from 'common/components/routes/ProtectedRoutes';
import { UserProvider } from 'common/contexts/UserContext';
import NavLayout from 'common/layouts/NavLayout';
import TestPage from 'pages/TestPage';
import AuthCallback from 'pages/account/AuthCallback';
import Login from 'pages/account/Login';
import RequestPasswordReset from 'pages/account/RequestPasswordReset';
import ResetPassword from 'pages/account/ResetPassword';
import SignUp from 'pages/account/SignUp';
import CourseConfirmation from 'pages/courses/CourseConfirmation';
import CourseDetail from 'pages/courses/CourseDetail';
import Courses from 'pages/courses/Courses';
import Register from 'pages/courses/Register';
import Home from 'pages/home/Home';
import NotFound from 'pages/not-found/NotFound';

import './App.css';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavLayout />}>
            <Route element={<PublicOnlyRoute />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
              <Route
                path='forgot-password'
                element={<RequestPasswordReset />}
              />
              <Route path='home' element={<Home />} />
            </Route>
            <Route index element={<Home />} />
            <Route path='auth/callback' element={<AuthCallback />} />
            <Route path='auth/reset-password' element={<ResetPassword />} />

            <Route path='courses' element={<Courses />} />
            <Route element={<PrivateRoute />}>
              <Route path='courses/:courseId' element={<CourseDetail />} />
              <Route path='courses/:courseId/register' element={<Register />} />
              <Route
                path='courses/:courseId/confirmation'
                element={<CourseConfirmation />}
              />
            </Route>

            <Route path='*' element={<NotFound />} />
            <Route path='test' element={<TestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
