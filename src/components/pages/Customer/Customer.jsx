import React, { useState } from 'react';
import './Customer.css';
import SponsorCamp from '../Sponsorcampaign/Scamp';
import CampaignForm from '../Campform/campform';

const Customer = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <div className="customer-cuscontainer">
        <div className="cuscard">
          <div className="custop-text">
            <div className="cusname">Sponsor an Existing Campaign</div>
          </div>
          <div className="cusbottom-text">
            <div className="custext">
              VolunT enables you to support ongoing campaigns that resonate with your values. By sponsoring existing
              initiatives, you can contribute to causes without the need to start your own project, making it an easy way
              to be part of the volunteering community.
            </div>
            <div className="cusbtn">
              <button onClick={() => handleButtonClick('sponsorCampaign')}>Join With Us</button>
            </div>
          </div>
        </div>
        <div className="cuscard">
          <div className="custop-text">
            <div className="cusname">Make a Campaign of Your Choice</div>
          </div>
          <div className="cusbottom-text">
            <div className="custext">
              Take the lead on VolunT and create a campaign that reflects your passion. Whether it's social issues, the
              environment, or any other cause, you can set your campaign's goals, connect with like-minded volunteers, and
              manage it effectively. It's a platform that empowers you to lead and collaborate with a community of
              volunteers.
            </div>
            <div className="cusbtn">
              <button onClick={() => handleButtonClick('makeCampaign')}>Join With Us</button>
            </div>
          </div>
        </div>
      </div>
      
    
      {activeComponent === 'sponsorCampaign' && <SponsorCamp />}
      {activeComponent === 'makeCampaign' && <CampaignForm />}
    </div>
  );
};

export default Customer;
