import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Home from './screens/home/Home'
import AboutUs from './screens/aboutUs/AboutUs'
import Blog from './screens/blog/Blog'
import ContactUs from './screens/contactUs/ContactUs'
import SignUp from './screens/auth/SignUp'
import Login from './screens/auth/Login';
import Cart from './screens/cart/Cart';
import Success from './screens/success/Success';

import NotFound from './screens/notFound/NotFound'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='blog' element={<Blog />} />
          <Route path='contact' element={<ContactUs />} />
          <Route path='cart' element={<Cart />} />
          <Route path='success' element={<Success />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;
