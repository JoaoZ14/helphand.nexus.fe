import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ONGList from './pages/ONGList';
import OngDetail from './components/pages/ongDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import './App.css';
import Home from './components/pages/home';
import Navigation from './components/Navigation';
import Header from './components/utils/header';
import FAQ from './pages/FAQ';
import { QRCodeSVG } from "qrcode.react";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/faqs' element={<FAQ />} />

        <Route path="/ongs" element={<ONGList />} />

        <Route path="/ong-details/:id" element={<OngDetail />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App; 