import React,{useEffect,useState} from 'react'
import './Services.css';
import supabase from '../../../supabase';


const Services = () => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        const { data } = await supabase.auth.getUser();
       
        let { data: VOLUNTEER, error ,vid,role} = await supabase
  .from('VOLUNTEER')
  .select("*")
  .eq(vid,data.id)
  if(VOLUNTEER){
    role = "volunteer"
    return;
  }

        
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
      
      <div className="scatogery-container">
      <div className="scard">
        <div className="simg">
          <img src='https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600' alt="Profile Image" />
        </div>
        
        <div className="stop-text">
          <div className="sname">
           Volunteer
          </div>
         
        </div>
        <div className="sbottom-text">
          <div className="stext">
          Join VolunT today and become part of a community dedicated to making a positive impact! Your time and effort can help change lives and create a better world for everyone. Embrace the power of volunteering and be a force for good. Join us now!
          </div>
          
        </div>
      </div>
      <div className="scard">
        <div className="simg">
          <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Profile Image" />
        </div>
        <div className="stop-text">
          <div className="sname">
           Customer
          </div>
         
        </div>
        <div className="sbottom-text">
          <div className="stext">
          Elevate your organization's volunteer campaign with VolunT. Join us to expand your reach and maximize your impact. Together, we can make a real difference. Join now!
          </div>
          
        </div>
      </div>
      <div className="scard">
        <div className="simg">
          <img src="https://images.pexels.com/photos/5324875/pexels-photo-5324875.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Profile Image" />
        </div>
        <div className="stop-text">
          <div className="sname">
            Organization
          </div>
          
        </div>
        <div className="sbottom-text">
          <div className="stext">
          Join as a VolunT customer and launch your own campaign on our website. It's easy, it's impactful, and it's your chance to make a difference. Join now and be the change you want to see!
          </div>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Services;