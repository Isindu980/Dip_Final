

import React, { useState, useEffect } from 'react';
import './Adash.css';

import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';

import Customer from '../Customer/Customer';

const CDashboard = () => {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [campaignClicked, setCampaignClicked] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchCustomerData = async () => {
      try {
        const user = supabase.auth.user();
        if (user) {
          const { data, error } = await supabase
            .from('CUSTOMER')
            .select('cusName')
            .eq('cusID', user.id)
            .single();

          if (error) {
            console.error('Error fetching customer data:', error.message);
          } else {
            setCustomerName(data.customer_name);
            setLoading(false); 
          }
        }
      } catch (error) {
        console.error('Error fetching customer data:', error.message);
        setLoading(false); 
      }
    };

    fetchCustomerData();
  }, []);

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setCampaignClicked(false);
  };

  const handleCampaignClick = () => {
    setCampaignClicked(true);
    setDashboardClicked(false);
  };

  const handleLogoutClick = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error.message);
      } else {
        navigate('/clogin');
      }
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
              {loading ? 'Loading...' : customerName.substring(0, 2).toUpperCase()}
            </div>
            <div className="admin-info">
              <h3>{loading ? 'Loading...' : customerName}</h3>
              <p>Customer</p>
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
              <a href="#" onClick={handleCampaignClick}>
                <ion-icon name="briefcase-outline"></ion-icon>
                <span>Campaigns</span>
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
          {dashboardClicked && <Customer />} 
         
        </main>
      </div>
    </div>
  );
};

export default CDashboard;
