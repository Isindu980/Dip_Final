import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase';
import './Volunteer.css';
import Volunjoinc from './vcampsjo';


const JoinForm = ({ campaignName, campaignTitle, onClose }) => {
  const [name, setName] = useState('');
  const [vID, setVID] = useState('');

  useEffect(() => {
    fetchVID();
  }, [name]);

  const fetchVID = async () => {
    try {
   
      const { data, error } = await supabase
        .from('VOLUNTEER')
        .select('vID')
        .eq('firstname', name)
        .single(); 

      if (error) {
        console.error('Error fetching vID:', error);
      } else {
        setVID(data.vID);
      }
    } catch (error) {
      console.error('Error fetching vID:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const { data, error } = await supabase
        .from('VOLUNTEER_CAMPAIGN')
        .insert([
          { v_ID: vID, vname: name, cname: campaignTitle }
        ]);

      if (error) {
        console.error('Error inserting data into VOLUNTEER_CAMPAIGN:', error);
      } else {
        console.log('Data inserted into VOLUNTEER_CAMPAIGN:', data);
        alert('Joined Successfully.You Can View Your Campaign Date Through Our Calender')
      }
    } catch (error) {
      console.error('Error inserting data into VOLUNTEER_CAMPAIGN:', error);
    }

   
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="join-form">
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Campaign Name:
        <input type="text" value={campaignName} readOnly />
      </label>
      <button type="submit">Join</button>
    </form>
  );
};

const Volunteer = (props) => {
  const { id, title, description, venue, volunteerAmount, date, buttonText } = props;
  const [showForm, setShowForm] = useState(false);

  const handleJoinClick = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="vcard">
      <div className="vcard-body">
        <h5 className="vcard-title">Campaign Details</h5>
        <p className="vcard-text">
          <span className="info-vlabel">Organization Name:</span> {title}
        </p>
        <p className="vcard-text">
          <span className="info-vlabel">Description:</span> {description}
        </p>
        <p className="vcard-text">
          <span className="info-vlabel">Venue:</span> {venue}
        </p>
        <p className="vcard-text">
          <span className="info-vlabel">Volunteer Amount:</span> {volunteerAmount}
        </p>
        <p className="vcard-text">
          <span className="info-vlabel">Date:</span> {date}
        </p>

        <a href="#" className="vcbtn btn-primary" onClick={handleJoinClick}>
          {buttonText}
        </a>

        {showForm && (
          <JoinForm campaignName={title} campaignTitle={title} onClose={handleCloseForm} />
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [campaigns, setCampaigns] = useState([]);

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

  return (
    <div>
      <div className="vpage-topic"></div>
      <div className="vcard-container">
        {campaigns.map((campaign) => (
          <Volunteer
            key={campaign.id}
            id={campaign.id}
            title={campaign.orgName}
            description={campaign.description}
            venue={campaign.venue}
            volunteerAmount={campaign.volunteerAmount}
            date={campaign.date}
            buttonText="Join now"
          />
        ))}
      </div>
    {/*<div> 
        <Volunjoinc/>
        </div>*/}
    </div>
  );
};

export default App;
