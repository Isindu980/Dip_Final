import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './camptab.css';
import supabase from '../../supabase';

const CampaignDataTable = () => {
  const [volunteerData, setCampaignData] = useState([]);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const { data, error } = await supabase.from('ORG_ORIENTED_CAMPAIGN').select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setCampaignData(data);
        }
      } catch (error) {
        console.error('Error fetching volunteer data:', error.message);
      }
    };

    fetchCampaignData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'org_id',
        accessor: 'org_id',
      },
      {
        Header: 'orgName',
        accessor: 'orgName',
      },
      {
        Header: 'description',
        accessor: 'description',
      },
      {
        Header: 'venue',
        accessor: 'venue',
      },
      {
        Header: 'volunteerAmount',
        accessor: 'volunteerAmount',
      },
      {
        Header: 'date',
        accessor: 'date',
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
      <h2></h2>
      <table {...getTableProps()} className="volunteer-table">
        <caption>Voluntery campaign data table.</caption>
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

export default CampaignDataTable;
