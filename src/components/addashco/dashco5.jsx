import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

import './camptab.css';
import supabase from '../../supabase';

const SCampaignDataTable = () => {
  const [volunteerData, setCampaignData] = useState([]);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const { data, error } = await supabase.from('CUSTOMER ORIENTED CAMPAIGN').select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setCampaignData(data);
        }
      } catch (error) {
        console.error('Error fetching campaign data:', error.message);
      }
    };

    fetchCampaignData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Campaign Id',
        accessor: 'cusor_Id',
      },
      {
        Header: 'Budget',
        accessor: 'budget',
      },
      {
        Header: 'Campaign Type',
        accessor: 'camptype',
      },
      {
        Header: 'Customer Name',
        accessor: 'cusname',
      },
      {
        Header: 'Contact Number',
        accessor: 'cusnum',
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
    data: volunteerData,
  });

  return (
    <div className="campaign-table">
    
      <table {...getTableProps()} className="volunteer-table">
      <caption>Customer campaign data table</caption>
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

export default SCampaignDataTable;
