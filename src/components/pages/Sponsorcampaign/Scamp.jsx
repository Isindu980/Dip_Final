import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase';
import './Scamp.css';
import CreditCardForm from '../Payment/Payment';

const SponsorCamp = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    fetchDatav();
  }, []);

  const fetchDatav = async () => {
    try {
      const { data, error } = await supabase.from('ORG_ORIENTED_CAMPAIGN').select('*');
      if (error) {
        console.error('Error fetching data from Supabase:', error);
      } else {
        setCampaigns(data);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    }
  };

  const handleSponsorshipClick = () => {
    setShowPayment(true);
  };

  return (
    <div>
      {showPayment ? (
        <CreditCardForm/> 
      ) : (
        <div>
          <div className='spoc'>
            <h1>Sponsor Campaigns</h1>
          </div>
          {campaigns.map((org) => (
            <div key={org.id} className="scamp-card">
              <div className="scamp-card-body">
                <h5 className="scamp-card-title">Campaign Details</h5>
                <p className="scamp-card-text">
                  <span className="info-scamplabel">Organization Name:</span> {org.orgName}
                </p>
                <p className="scamp-card-text">
                  <span className="info-scamplabel">Description:</span> {org.description}
                </p>
                <p className="scamp-card-text">
                  <span className="info-scamplabel">Venue:</span> {org.venue}
                </p>
                <p className="scamp-card-text">
                  <span className="info-scamplabel">Volunteers Needed:</span> {org.volunteerAmount}
                </p>
                <p className="scamp-card-text">
                  <span className="info-scamplabel">Date:</span> {org.date}
                </p>

                <button className="scamp-small-button" onClick={handleSponsorshipClick}>
                  Sponsor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SponsorCamp;
