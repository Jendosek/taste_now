import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Home from './screens/home/Home'
import AboutUs from './screens/aboutUs/AboutUs'
import Blog from './screens/blog/Blog'
import ContactUs from './screens/contactUs/ContactUs'
import SignUp from './screens/signUp/SignUp'
import Cart from './screens/cart/Cart';

import NotFound from './screens/notFound/NotFound'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='blog' element={<Blog />} />
          <Route path='contact' element={<ContactUs />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App;
