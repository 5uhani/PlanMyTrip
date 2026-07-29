import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useTheme } from '../hooks/useTheme.js';

const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-poppins">
      <Navbar />
      
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />

      {/* Toast Notification Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
};

export default MainLayout;
