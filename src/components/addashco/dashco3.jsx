import React, { useEffect, useState } from 'react';
import './dashco1.css';
import supabase from '../../supabase';

const CusIDCount = () => {
  const [customerIDCount, setCustomerIDCount] = useState(null);

  useEffect(() => {
    const fetchCustomerIDCount = async () => {
      try {
        const { data, error } = await supabase
          .from('CUSTOMER')
          .select('cusID', { count: 'exact' });

        if (error) {
          throw error;
        }

        if (data) {
          const count = data.length;
          setCustomerIDCount(count);
        }
      } catch (error) {
        console.error('Error fetching customer ID count:', error.message);
      }
    };

    fetchCustomerIDCount();
  }, []);

  return (
    <div className="vcounta-cont">
      <div>
        <h2>Customer Count</h2>
        {customerIDCount !== null ? (
          <p>Total Customer IDs: {customerIDCount}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CusIDCount;
