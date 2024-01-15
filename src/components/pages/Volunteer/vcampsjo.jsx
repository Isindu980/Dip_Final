import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase';
import { useNavigate } from 'react-router-dom';

const Volunjoinc = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    
    const userIdFromNavigation = navigate().state?.userId;

    if (userIdFromNavigation) {
      setUserId(userIdFromNavigation);
      fetchCampaigns(userIdFromNavigation);
    } else {
      console.error('User ID not found in navigation state');
     
      navigate('/'); 
    }
  }, [navigate]);

  const fetchCampaigns = async (userId) => {
    try {
      
      const { data, error } = await supabase
        .from('VOLUNTEER_CAMPAIGN')
        .select('*')
        .eq('v_ID', userId);

      if (error) {
        console.error('Error fetching data from VOLUNTEER_CAMPAIGN:', error);
      } else {
        setCampaigns(data || []);
      }
    } catch (error) {
      console.error('Error fetching data from VOLUNTEER_CAMPAIGN:', error);
    }
  };

  return (
    <div>
      <h2>Your Volunteer Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            Campaign Name: {campaign.cname}, Volunteer Name: {campaign.vname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Volunjoinc;
