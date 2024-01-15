

import React, { useEffect, useState } from 'react';

import './dashco1.css';
import supabase from '../../supabase';

const VolunteerIDCount = () => {
  const [volunteerIDCount, setVolunteerIDCount] = useState(null);

  useEffect(() => {
    const fetchVolunteerIDCount = async () => {
      try {
        const { data, error } = await supabase
          .from('VOLUNTEER')
          .select('vID', { count: 'exact' });

        if (error) {
          throw error;
        }

        if (data) {
          const count = data.length;
          setVolunteerIDCount(count);
        }
      } catch (error) {
        console.error('Error fetching volunteer ID count:', error.message);
      }
    };

    fetchVolunteerIDCount();
  }, []);

  return (
    <div className="vcounta-cont">
      <h2>Volunteer ID Count</h2>
      {volunteerIDCount !== null ? (
        <p>Total Volunteer IDs: {volunteerIDCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VolunteerIDCount;
