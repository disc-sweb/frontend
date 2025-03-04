import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  PrivateRoute,
  PublicOnlyRoute,
} from 'common/components/routes/ProtectedRoutes';
import HomeDoulaProgram from 'common/components/section/HomePage/HomeDoulaProgram';
import HomeIntro from 'common/components/section/HomePage/HomeIntro';
import { SectionComponent } from 'common/components/section/SectionComponent';
import { UserProvider } from 'common/contexts/UserContext';
import NavLayout from 'common/layouts/NavLayout';
import AuthCallback from 'pages/account/AuthCallback';
import Login from 'pages/account/Login';
import RequestPasswordReset from 'pages/account/RequestPasswordReset';
import ResetPassword from 'pages/account/ResetPassword';
import SignUp from 'pages/account/SignUp';
import Home from 'pages/home/Home';
import NotFound from 'pages/not-found/NotFound';

import './App.css';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavLayout />}>
            <Route element={<PrivateRoute />}>
              <Route index element={<Home />} />
            </Route>
            <Route element={<PublicOnlyRoute />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
              <Route
                path='forgot-password'
                element={<RequestPasswordReset />}
              />
            </Route>
            <Route path='auth/callback' element={<AuthCallback />} />
            <Route path='auth/reset-password' element={<ResetPassword />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
        <SectionComponent
          sectionTitle='Welcome to our Training Academy - Where We Are Empowering Change Through Education!'
          sectionDescript={[
            'Step into a world where ancient wisdom and modern expertise converge to create a holistic approach to doula care. At Sokana Collective, we honor the rich traditions of birth support while embracing the latest evidence-based practices, ensuring all people/doulas are equipped to provide comprehensive care to families of all backgrounds.',
            'Our training academy offers a diverse array of classes, meticulously crafted to cater to every aspect of doula practice. From prenatal education and labor support techniques to postpartum care and lactation consulting, our curriculum is designed to empower you with the skills and knowledge needed to confidently guide families through their unique fertility, birthing journeys, and beyond.',
            'Led by experienced instructors and rooted in a deep reverence for the birthing process, our training programs emphasize the importance of cultural sensitivity, inclusivity, and compassionate care. Join our community of passionate individuals dedicated to nurturing a supportive and empowering environment for expectant people and families.',
          ]}
          sectionGap={72}
          sectionPaddingBot={128}
          backgroundColor='#FBE9FD'
          moreButton={true}
          titleColor={'#007575'}
          body={<HomeIntro />}
        />
        <SectionComponent
          sectionTitle='Illinois Medicaid-Certified Doula Program'
          sectionDescript={[]}
          sectionGap={0}
          sectionPaddingBot={128}
          backgroundColor='#FFFFFF'
          moreButton={true}
          titleColor={'#000000'}
          body={<HomeDoulaProgram />}
        />
      </BrowserRouter>
    </UserProvider>
  );
}
