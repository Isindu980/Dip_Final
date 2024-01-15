

import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase';
import './OrganizationScard.css';

const Organizationscard = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    description: '',
    venue: '',
    volunteerAmount: '',
    date: '',
  });

  const [campaigns, setCampaigns] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUserData(user);

        let { data: campaignsData, error } = await supabase
          .from('ORG_ORIENTED_CAMPAIGN')
          .select('*')
          .eq('org_id', user.id);

        if (error) {
          console.error('Error fetching campaigns from Supabase:', error);
        } else {
          setCampaigns(campaignsData);
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    }

    getUserData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('ORG_ORIENTED_CAMPAIGN')
        .select('*')
        .eq('org_id', userData.id);

      if (error) {
        console.error('Error fetching data from Supabase:', error);
      } else {
        setCampaigns(data);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editIndex === -1) {
        const { data, error } = await supabase
          .from('ORG_ORIENTED_CAMPAIGN')
          .upsert([
            {
              org_id: userData.id || '',
              description: formData.description || '',
              venue: formData.venue || '',
              volunteerAmount: formData.volunteerAmount || '',
              date: formData.date || '',
            },
          ]);

        if (error) {
          console.error('Error adding data to Supabase:', error);
        } else {
          console.log('Data added successfully:', data);
          fetchData();
        }
      } else {
        const { data, error } = await supabase
          .from('ORG_ORIENTED_CAMPAIGN')
          .upsert([
            {
              org_id: campaigns[editIndex].org_id,
              orgName:formData.orgName,
              description: formData.description || '',
              venue: formData.venue || '',
              volunteerAmount: formData.volunteerAmount || '',
              date: formData.date || '',
            },
          ]);

        if (error) {
          console.error('Error updating data in Supabase:', error);
        } else {
          console.log('Data updated successfully:', data);
          fetchData();
        }
        setEditIndex(-1);
      }
    } catch (error) {
      console.error('Error upserting data into Supabase:', error);
    } finally {
      setLoading(false);
    }

    setFormData({
      orgName: '',
      description: '',
      venue: '',
      volunteerAmount: '',
      date: '',
    });
  };

  const handleEdit = (campaignId) => {
    const index = campaigns.findIndex((campaign) => campaign.org_id === campaignId);
    if (index !== -1) {
      setFormData(campaigns[index]);
      setEditIndex(index);
    }
  };

  const handleDelete = async (campaignId) => {
    try {
      const { data, error } = await supabase
        .from('ORG_ORIENTED_CAMPAIGN')
        .delete()
        .eq('org_id', campaignId);

      if (error) {
        console.error('Error deleting data from Supabase:', error);
      } else {
        console.log('Data deleted successfully:', data);
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting data from Supabase:', error);
    }
  };

  return (
    <div>
      <h1 className="orgcatite">WELCOME</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="orgName"
          placeholder="Organization Name"
          value={formData.orgName}
          onChange={handleChange}
          
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
        />
        <input
          type="number"
          name="volunteerAmount"
          placeholder="Volunteer Needed Amount"
          value={formData.volunteerAmount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
        />
        <button type="submit" className="small-button" disabled={loading}>
          {loading ? 'Submitting...' : editIndex === -1 ? 'Add' : 'Edit'}
        </button>
      </form>
      <div className="organization-cards">
        {campaigns.map((campaign) => (
          <div key={campaign.org_id} className="organization-card">
            <h2>Name: {campaign.orgName}</h2>
            <p>Description: {campaign.description}</p>
            <p>Venue: {campaign.venue}</p>
            <p>Volunteer Needed Amount: {campaign.volunteerAmount}</p>
            <p>Date: {campaign.date}</p>
            <button onClick={() => handleEdit(campaign.org_id)} className="small-button">
              Edit
            </button>
            <button onClick={() => handleDelete(campaign.org_id)} className="small-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizationscard;
