import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import OurStoryPage from './pages/OurStoryPage';
import HairSanctuaryPage from './pages/HairSanctuaryPage';
import SkinAndSoulPage from './pages/SkinAndSoulPage';
import OurCoursesPage from './pages/OurCoursesPage';
import BeautyJournalPage from './pages/BeautyJournalPage';

import './App.css'; // Global styles
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/hair-sanctuary" element={<HairSanctuaryPage />} />
          <Route path="/skin-and-soul" element={<SkinAndSoulPage />} />
          <Route path="/courses" element={<OurCoursesPage />} />
          <Route path="/beauty-journal" element={<BeautyJournalPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;