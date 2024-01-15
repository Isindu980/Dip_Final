import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import supabase from '../../supabase';



const VolunteerCampaignDataTable = () => {
  const [VolunteerCampaignData, setVolunteerCampaignData] = useState([]);

  useEffect(() => {
    const fetchVolunteerCampaignData = async () => {
      try {
        const { data, error } = await supabase.from('VOLUNTEER_CAMPAIGN').select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setVolunteerCampaignData(data);
        }
      } catch (error) {
        console.error('Error fetching volunteer data:', error.message);
      }
    };

    fetchVolunteerCampaignData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Volunteer ID',
        accessor: 'v_ID',
      },
      {
        Header: 'Volunteer Name',
        accessor: 'vname',
      },
      {
        Header: 'Organization Name',
        accessor: 'cname',
      },
   
      
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: VolunteerCampaignData,
  });

  return (
    <div>
      <table {...getTableProps()} className="volunteer-table">
        <caption>Volunteer Campaign Details</caption>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default VolunteerCampaignDataTable;