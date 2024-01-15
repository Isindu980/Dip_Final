

import React, { useState, useEffect } from 'react';
import './Adash.css';
import Volunteer from '../Volunteer/Volunteer';
import { useLocation, useNavigate } from 'react-router-dom';
import VLogout from '../Logout/vlogout';
import supabase from '../../../supabase';

const VDashboard = () => {
  const [dashboardClicked, setDashboardClicked] = useState(true);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (state && state.user) {
      setUser(state.user);
    } else {
      
      navigate('/vlogin');
    }
  }, [state, navigate]);

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setDashboardClicked(true);
    setLogoutClicked(false);
  };

  const handleLogoutClick = async () => {
    try {
     
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error.message);
       
      } else {
       
        navigate('/vlogin');
      }
    } catch (error) {
      console.error('Logout error:', error.message);
    
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const uploadImageToSupabase = async (file) => {
    try {
    
      const { data, error } = await supabase.storage
        .from('vol') 
        .upload(`images/${file.name}`, file, { cacheControl: '3600' });

      if (error) {
        console.error('Image upload error:', error.message);
      
      } else {
      
        return data[0]?.url;
      }
    } catch (error) {
      console.error('Image upload error:', error.message);
    
    }
  };

  const saveImageToSupabaseTable = async (imageUrl) => {
    try {
     
      const { error } = await supabase
        .from('VOLUNTEER') 
        .update({ image: imageUrl })
        .eq('vID', user.id); 

      if (error) {
        console.error('Update image error:', error.message);
       
      }
    } catch (error) {
      console.error('Update image error:', error.message);
   
    }
  };

  const handleSaveImage = async () => {
    if (selectedFile) {
      const imageUrl = await uploadImageToSupabase(selectedFile);
      if (imageUrl) {
        await saveImageToSupabaseTable(imageUrl);
        
        setUser((prevUser) => ({ ...prevUser, image: imageUrl }));
      }
    }
  };

  const renderUserAvatar = () => {
 
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      return <img src={imageUrl} alt="User Avatar" />;
    } else if (user && user.image) {
      return <img src={user.image} alt="User Avatar" />;
    } else {
      return user && user.firstname && user.firstname.charAt(0);
    }
  };

  return (
    <div>
      <div className="addcontainer">
        <aside className="sidebar">
          <div className="admin">
            <label htmlFor="avatarInput" className="admin-avatar">
              {renderUserAvatar()}
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div className="admin-info">
              <h3>{user && user.firstname}</h3>
              <p>{user && user.email}</p>
            </div>
          </div>
          <div className="hr"></div>
          <ul className="menu one">
            <li className="active">
              <a href="#" onClick={handleDashboardClick}>
                <ion-icon name="home-outline"></ion-icon>
                <span>Dashboard</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={handleLogoutClick}>
                <ion-icon name="log-out-outline"></ion-icon>
                <span>Log out</span>
              </a>
            </li>
          </ul>
          <button onClick={handleSaveImage}>Save Image</button>
        </aside>
        <main className="events">
          {dashboardClicked && <Volunteer />}
          {logoutClicked && <VLogout />}
        </main>
      </div>
    </div>
  );
};

export default VDashboard;
