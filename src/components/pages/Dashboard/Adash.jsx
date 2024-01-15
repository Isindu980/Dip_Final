import React, { useState, useEffect } from 'react';
import './Adash.css';
import Organizationscard from '../Organization/OrganizationScard';
import Contact from '../Contact/contact';
import supabase from '../../../supabase';
import { useNavigate } from 'react-router-dom';

const ODashboard = () => {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);
  const [userName, setUserName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
          setUserName(userData.user_metadata.full_name);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    const fetchOrganizationData = async () => {
      try {
       
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
          const { data, error } = await supabase
            .from('ORGANIZATION')
            .select('org_name')
            .eq('org_id', userData.id)
            .single();

          if (error) {
            console.error('Error fetching organization data:', error.message);
          } else if (data) {
            setOrganizationName(data.org_name);
            setLoading(false);
          } else {
            console.warn('Organization data not found.');
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching organization data:', error.message);
        setLoading(false);
      }
    };

    fetchUserData();
    fetchOrganizationData();
  }, []);

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setContactClicked(false);
  };

  const handleContactClick = () => {
    setContactClicked(true);
    setDashboardClicked(false);
  };

  const handleLogoutClick = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/ologin');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div>
      <div className="addcontainer">
        <aside className="sidebar">
          <div className="admin">
            <div className="admin-avatar">
              {loading ? 'Loading...' : userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="admin-info">
              <h3>{loading ? 'Loading...' : userName}</h3>
              <p>Organization: {loading ? 'Loading...' : organizationName}</p>
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
              <a href="#" onClick={handleContactClick}>
                <ion-icon name="person-outline"></ion-icon>
                <span>Contact</span>
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="calendar-outline"></ion-icon>
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="mail-outline"></ion-icon>
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleLogoutClick}>
                <ion-icon name="log-out-outline"></ion-icon>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </aside>
        <main className="events">
          {dashboardClicked && <Organizationscard />}
          {contactClicked && <Contact />}
        </main>
      </div>
    </div>
  );
};

export default ODashboard;
