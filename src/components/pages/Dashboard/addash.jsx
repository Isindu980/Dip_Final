
import React, { useState, useEffect } from 'react';
import './Adash.css'; 
import VolunteerIDCount from '../../addashco/dashco1';
import OrgIDCount from '../../addashco/dashco2';
import supabase from '../../../supabase';
import CusIDCount from '../../addashco/dashco3';
import CampaignDataTable from '../../addashco/dashco4';
import Addall from '../../addashco/addall';
import { useNavigate } from 'react-router-dom';
import Organization from '../Organization/Organization';
import Volunteer from '../Volunteer/Volunteer';
import SCampaignDataTable from '../../addashco/dashco5';
import OrganizationDataTable from '../../addashco/dashco6';
import VolunteerDataTable from '../../addashco/dashco7';
import VolunteerCampaignDataTable from '../../addashco/dashco8';



const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [selectedDashboardItem, setSelectedDashboardItem] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { user, error } = await supabase.auth.user();

        if (error) {
          console.error('Error fetching admin data:', error.message);
        } else if (user) {
          const { data, error } = await supabase
            .from('ADMIN')
            .select('firstname, lastname, email') 
            .eq('admin_Id', user.id)
            .single();

          if (error) {
            console.error('Error fetching admin data:', error.message);
          } else {
            setAdminData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching admin data:', error.message);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error.message);
      } else {
        console.log('Logout successful');
        navigate('/alogin');
      }
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const renderDashboardLink = (item) => (
    <li key={item.key} className={selectedDashboardItem === item.key ? 'active' : ''}>
      <a href="#" onClick={() => setSelectedDashboardItem(item.key)}>
        <ion-icon name={item.icon}></ion-icon>
        <span>{item.label}</span>
      </a>
    </li>
  );

  const dashboardItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'home-outline' },
    { key: 'volunteer', label: 'Volunteer ', icon: 'people-outline' },
    { key: 'organization', label: 'Organization ', icon: 'business-outline' },
    { key: 'customer', label: 'Customer ', icon: 'person-outline' },
    { key: 'campaign', label: 'Campaigns', icon: 'clipboard-outline' },
    { key: 'campaigns', label: 'Customer Campaigns', icon: 'clipboard-outline' },
    { key: 'Organizations', label: 'Organization Delete', icon: 'clipboard-outline' },
    { key: 'vcampaigns', label: 'volunteer Delete', icon: 'clipboard-outline' },
    { key: 'vcampjoin', label: 'Joined Volunteers', icon: 'clipboard-outline' },
  ];

  const renderSelectedComponent = () => {
    switch (selectedDashboardItem) {
      case 'campaigns':
        return <SCampaignDataTable />;
      case 'volunteer':
        return <VolunteerIDCount />;
        case 'Organizations':
          return <OrganizationDataTable />;
      case 'organization':
        return <OrgIDCount />;
      case 'customer':
        return <CusIDCount />;
      case 'campaign':
        return <CampaignDataTable />;
        case 'vcampaigns':
          return <VolunteerDataTable />;
          case 'vcampjoin':
            return <VolunteerCampaignDataTable />
      default:
        return <p><Addall/></p>;
    }
  };

  return (
    <div>
      <div className="container">
        <aside className="sidebar">
          {adminData && (
            <div className="admin">
              <div className="admin-avatar">
                <p>{adminData.firstname.charAt(0) + adminData.lastname.charAt(0)}</p>
              </div>
              <div className="admin-info">
                <h3>{adminData.firstname} {adminData.lastname}</h3>

               
              </div>
            </div>
          )}
          <div className="hr"></div>
          <ul className="menu one">
            {dashboardItems.map(renderDashboardLink)}
          </ul>
          <div className="hr"></div>
          <ul className="menu two">
            <li>
              <a href="#">
                <ion-icon name="help-circle-outline"></ion-icon>
                <span>Help</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleLogout}>
                <ion-icon name="log-out-outline"></ion-icon>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </aside>
        <main className="events">
          {renderSelectedComponent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

