
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';

import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Login from './components/pages/Login/Login';
import Volunteer from './components/pages/Volunteer/Volunteer';
import Navbar from './components/Navbar/Navbar';
import VolunteerQ from './components/pages/VolnteerQform/VolunteerQ';
import MyCalendar from './components/pages/Calender/Calender1';
import VRegister from './components/pages/VRegister/VRegister';
import Services from './components/pages/Services/Services';
import Organization from './components/pages/Organization/Organization';
import ORegister from './components/pages/ORegister/ORegister';
import CommentCards from './components/pages/Home/Homecon2';
import CustomerCcat from './components/pages/Customer/CustomerCcat';
import CRegister from './components/pages/CRegister/CRegister';
import Customer from './components/pages/Customer/Customer';
import CreditCardForm from './components/pages/Payment/Payment';

import Calendar from './components/pages/Calender/Calender1';
import Contact from './components/pages/Contact/contact';
import UserProfile from './components/pages/UserP/userp';
import SponsorCamp from './components/pages/Sponsorcampaign/Scamp';
import CampaignForm from './components/pages/Campform/campform';
import Dashboard from './components/pages/Dashboard/Adash';
import ODashboard from './components/pages/Dashboard/Adash';
import VDashboard from './components/pages/Dashboard/voldash';
import AdminDash from './components/pages/Dashboard/addash';
import OLogin from './components/pages/Login/Login';
import VLogin from './components/pages/Login/vLogin';
import ALogin from './components/pages/Login/ALogin';
import CLogin from './components/pages/Login/cLogin';

import CDashboard from './components/pages/Dashboard/cdash';

import Addall from './components/addashco/addall';
import Volunjoinc from './components/pages/Volunteer/vcampsjo';





function App() {
  return (
    <div className="App">
       <Navbar/>
     <BrowserRouter>
       <Routes>
       <Route path='/home' element={<Home/>}/>
       <Route path='/home' element={<CommentCards/>}/>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/ologin' element={<OLogin/>}/>
       <Route path='/vlogin' element={<VLogin/>}/>
       <Route path='/alogin' element={<ALogin/>}/>
       <Route path='/clogin' element={<CLogin/>}/>
       <Route path='/volunteer' element={<Volunteer/>}/>
       <Route path='/vregister' element={<VRegister/>}/>
       <Route path='/oregister' element={<ORegister/>}/>
       <Route path='/cregister' element={<CRegister/>}/>
       <Route path='/qform'  element={<VolunteerQ/>}/>
       <Route path='/calendar' element={<Calendar/>}/>
       <Route path='/service' element={<Services/>}/>
       <Route path='/organization' element={<Organization/>}/>
       <Route path='/cuscatogery' element={<CustomerCcat/>}/>
       <Route path='/customer' element={<Customer/>}/>
       <Route path='/payment' element={<CreditCardForm/>}/>
       <Route path='/cussponsor' element={<SponsorCamp/>}/>
       <Route path='/cusform' element={<CampaignForm/>}/>
       <Route path='/volj' element={<Volunjoinc/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/adash' element={<ODashboard/>}/>
       <Route path='/vdash' element={<VDashboard/>}/>
       <Route path='/aadash' element={<AdminDash/>}/>
       <Route path='/addall' element={<Addall/>}/>
       <Route path='/cudash' element={<CDashboard/>}/>
       </Routes>
     </BrowserRouter>
     <Footer/> 
    </div>
  );
}

export default App;