// VLogout.js

import React from 'react';
import './logout.css';
import supabase from '../../../supabase';
import { useNavigate } from 'react-router-dom';

const VLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the Supabase signout function to clear the session
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error.message);
        // Handle error, show error message, etc.
      } else {
        // Redirect to the login page or any other desired route after logout
        navigate('/vlogin');
      }
    } catch (error) {
      console.error('Logout error:', error.message);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default VLogout;
