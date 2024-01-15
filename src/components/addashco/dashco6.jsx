import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './camptab.css';
import supabase from '../../supabase';

const OrganizationDataTable = () => {
  const [organizationData, setOrganizationData] = useState([]);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const { data, error } = await supabase.from('ORGANIZATION').select('*')
        ;

        if (error) {
          throw error;
        }
        if (data) {
          setOrganizationData(data);
        }
      } catch (error) {
        console.error('Error fetching organization data:', error.message);
      }
    };

    fetchOrganizationData();
  }, []);
  const deleteOrganization = async (org_Id) => {
    try {
      const { error } = await supabase
        .from('ORGANIZATION')
        .delete()
        .eq('org_Id', org_Id);
       

      if (error) {
        throw error;
      }

      const { data: newData, error: fetchError } = await supabase.from('ORGANIZATION').select('*');

      if (fetchError) {
        throw fetchError;
      }

      if (newData) {
        setOrganizationData(newData);
      }
    } catch (error) {
      console.error('Error deleting organization:', error.message);
    }
  };


  const columns = React.useMemo(
    () => [
      {
        Header: 'Organization Id',
        accessor: 'org_Id',
      },
      {
        Header: 'Organization name',
        accessor: 'org_name',
      },
      {
        Header: 'Contact number',
        accessor: 'org_contact_num',
      },
      {
        Header: 'Email',
        accessor: 'org_email',
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
    data: organizationData,
  });

  

  return (
    <div>
      <h1 className="details">Organizations</h1>
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
                  <button onClick={() => deleteOrganization(row.original.org_Id)}>
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

export default OrganizationDataTable;