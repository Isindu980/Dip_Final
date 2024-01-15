import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './camptab.css';
import supabase from '../../supabase';

const VolunteerDataTable = () => {
  const [VolunteerData, setVolunteerData] = useState([]);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const { data, error } = await supabase.from('VOLUNTEER').select('*');

        if (error) {
          throw error;
        }
        if (data) {
          setVolunteerData(data);
        }
      } catch (error) {
        console.error('Error fetching volunteer data:', error.message);
      }
    };

    fetchVolunteerData();
  }, []);

  const deleteVolunteer = async (vID) => {
    try {
      console.log('Delete button clicked for vID:', vID); 

      const { error: deleteError } = await supabase
        .from('VOLUNTEER')
        .delete('*')
        .eq('vID', vID);

      if (deleteError) {
        throw deleteError;
      }

      const { data: newData, error: fetchError } = await supabase.from('VOLUNTEER').select('*');

      if (fetchError) {
        throw fetchError;
      }

      if (newData) {
        console.log('New Data after deletion:', newData);
        setVolunteerData(newData);
      }
    } catch (error) {
      console.error('Error deleting volunteer:', error.message);
      console.error('Error details:', error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Volunteer Id',
        accessor: 'vID',
      },
      {
        Header: 'First Name',
        accessor: 'firstname',
      },
      {
        Header: 'Last Name',
        accessor: 'lastname',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Contact NO',
        accessor: 'contact_no',
      },
      {
        Header: 'Email',
        accessor: 'email',
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
    data: VolunteerData,
  });

  return (
    <div>
      <h1 className="details">Volunteers</h1>
      <table {...getTableProps()} className="volunteer-table">
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
                <td>
                  <button onClick={() => deleteVolunteer(row.original.vID)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerDataTable;