import React, { useEffect, useState } from 'react';
import './dashco1.css';
import supabase from '../../supabase';

const OrgIDCount = () => {
  const [orgIDCount, setOrgIDCount] = useState(null);

  useEffect(() => {
    const fetchOrgIDCount = async () => {
      try {
        const { data, error } = await supabase
          .from('ORGANIZATION')
          .select('org_Id', { count: 'exact' });

        if (error) {
          throw error;
        }

        if (data) {
          const count = data.length;
          setOrgIDCount(count);
        }
      } catch (error) {
        console.error('Error fetching org ID count:', error.message);
      }
    };

    fetchOrgIDCount();
  }, []);

  return (
    <div className="vcounta-cont">
      <div>
        <h2>Organization Count</h2>
        {orgIDCount !== null ? (
          <p>Total Volunteer IDs: {orgIDCount}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default OrgIDCount;
