import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { AuthProvider } from './components/auth/AuthContext';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/homepage/Home';
import PropertyDetails from './pages/propertydetail/PropertyDetails';
import PropertyList from './pages/propertylist/PropertyList';
import SearchPropertyList from './pages/searchproperties/SearchPropertyList';
import CategoryPage from './pages/categorypage/CategoryPage';
import PostProperty from './pages/postproperty/PostProperty';
import Plan from './pages/plans/Plan';
import Profile from './pages/profile/Profile';
import AuthRoute from './components/auth/AuthRoute';
import EditProfilePage from './pages/edituser/EditProfilePage';


function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const openLoginModal = () => {
    setShowLogin(true);
    setModalOpen(true);
  };

  return (
    <AuthProvider>
      <Navbar
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />

      <Routes>
        <Route path='/' element={<Navigate replace to="/home" />} />
        <Route path='/home' element={<Home openLogin={openLoginModal} />} />

        {/* Protected Routes */}
        <Route
          path='/property/:id'
          element={
            <AuthRoute onRequireLogin={openLoginModal}>
              <PropertyDetails />
            </AuthRoute>
          }
        />
        <Route
          path='/properties'
          element={
            <AuthRoute onRequireLogin={openLoginModal}>
              <PropertyList />
            </AuthRoute>
          }
        />
        <Route
          path='/searchproperties'
          element={
            <AuthRoute onRequireLogin={openLoginModal}>
              <SearchPropertyList />
            </AuthRoute>
          }
        />
        <Route
          path='/category/:type'
          element={
            <AuthRoute onRequireLogin={openLoginModal}>
              <CategoryPage />
            </AuthRoute>
          }
        />
        <Route
          path='/:sid/addproperty'
          element={
            <AuthRoute onRequireLogin={openLoginModal}>
              <PostProperty />
            </AuthRoute>
          }
        />
        <Route
          path='/:uid/buyplan'
          element={
            <AuthRoute onRequireLogin={openLoginModal}>
              <Plan />
            </AuthRoute>
          }
        />
        <Route
          path='/profile/:uid'
          element={
            <AuthRoute onRequireLogin={openLoginModal}>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path='/user/:uid/edit'
          element={
            <AuthRoute onRequireLogin={openLoginModal}>
              <EditProfilePage />
            </AuthRoute>
          }
        />
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;