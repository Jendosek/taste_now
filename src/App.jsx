import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './screens/home/Home';
import useAuthListener from './hooks/useAuthListener';

// Home is the landing page and stays in the main bundle;
// every other page is loaded on demand.
const AboutUs = lazy(() => import('./screens/aboutUs/AboutUs'));
const Blog = lazy(() => import('./screens/blog/Blog'));
const ContactUs = lazy(() => import('./screens/contactUs/ContactUs'));
const SignUp = lazy(() => import('./screens/auth/SignUp'));
const Login = lazy(() => import('./screens/auth/Login'));
const Cart = lazy(() => import('./screens/cart/Cart'));
const Success = lazy(() => import('./screens/success/Success'));
const Profile = lazy(() => import('./screens/profile/Profile'));
const AdminRoute = lazy(() => import('./screens/admin/AdminRoute'));
const PrivacyPolicy = lazy(() => import('./screens/footerScreens/privacyPolicy/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./screens/footerScreens/termsOfService/TermsOfService'));
const Help = lazy(() => import('./screens/footerScreens/help/Help'));
const NotFound = lazy(() => import('./screens/notFound/NotFound'));

function App() {
  useAuthListener();

  return (
    <div>
      <Suspense fallback={null}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<AboutUs />} />
            <Route path='blog' element={<Blog />} />
            <Route path='contact' element={<ContactUs />} />
            <Route path='cart' element={<Cart />} />
            <Route path='success' element={<Success />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminRoute />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="help" element={<Help />} />
            <Route path='*' element={<NotFound />} />
          </Route>
          <Route path='signup' element={<SignUp />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
