import React from 'react';
import './CustomerCcat.css';

function CustomerCcat() {
  const cardsData = [
    {
      imageSrc: 'https://ecosparklecanada.com/wp-content/uploads/2016/12/ecosparkle-green-clean-tree-planting-announcement-banner-image.jpg',
      title: 'Tree Plantation',
      text: 'Tree plantation is a vital initiative aimed at preserving our environment and combating climate change. By planting trees, we not only enhance the beauty of our surroundings but also contribute to cleaner air, improved biodiversity, and carbon sequestration. This eco-friendly endeavor brings communities together and instills a sense of responsibility towards the planet. It is a powerful way to ensure a greener, healthier future for generations to come.',
   
    },
    {
      imageSrc: 'https://www.signupgenius.com/cms/socialMediaImages/beach-clean-up-tips-ideas-facebook-1200x630.png',
      title: 'Beach Cleanup',
      text: 'Participating in beach cleanups is a commendable effort to protect our oceans and marine life. These events are a testament to our commitment to preserving the natural beauty of our coastlines and minimizing the harmful impact of plastic and litter. Through collective action, we can restore the serenity of our beaches and create a cleaner, safer environment for everyone to enjoy.',
   
    },
    {
      imageSrc: 'https://mss-p-049-delivery.sitecorecontenthub.cloud/api/public/content/44eaa46fec724bf8896f8796c0bad188?v=24c7c1e8&t=web320',
      title: 'Waste Reduction',
      text: 'Waste reduction is a conscientious practice that focuses on minimizing the generation of waste and adopting sustainable, eco-friendly alternatives. It involves reducing, reusing, and recycling materials to decrease our ecological footprint. By embracing waste reduction practices, we can conserve resources, decrease pollution, and promote a more sustainable and responsible way of living',
   
    },
    {
      imageSrc: 'https://i.pinimg.com/originals/c2/25/60/c22560ad6f4d1f630f8fbb16b289e81c.jpg',
      title: 'Homeless outreach',
      text: 'Homeless outreach programs are a compassionate response to the urgent issue of homelessness. These initiatives extend a helping hand to individuals in need, offering shelter, food, and support services. By engaging in homeless outreach, we not only address the immediate challenges faced by those experiencing homelessness but also work towards long-term solutions, such as affordable housing and social services.',
     
    },
    {
      imageSrc: 'https://static.sliit.lk/wp-content/uploads/2019/02/13095053/Blood-Donation-Campaign-2019-3.jpg',
      title: 'Blood Drives',
      text: 'Blood drives play a crucial role in saving lives and ensuring an adequate supply of blood for medical emergencies. Donating blood is an altruistic act that can make a significant impact on the health and well-being of others. By participating in blood drives, we contribute to a lifeline of care for patients undergoing surgeries, facing illness, or recovering from accidents.',
    
    },
    {
      imageSrc: 'https://i.vimeocdn.com/video/895703484-440f904b650808cf900de36c21ca0fd46247fee14882ef8617bff7d5a45da268-d_640',
      title: 'School Renovation',
      text: 'School renovation projects are instrumental in providing safe, conducive learning environments for students. They entail refurbishing classrooms, updating facilities, and creating inspiring spaces for education. School renovations empower students and teachers with better resources and inspire a love for learning, ultimately shaping the future leaders of our communities.',
     
    },
  ];

  return (
    <div className="Ccmain">
      <div className="campaign-categories-header">Campaign Categories</div>

      <ul className="Cccards">
        {cardsData.map((card, index) => (
          <li className="Cccards_item" key={index}>
            <div className="Cccard">
              <div className="Cccard_image">
                <img src={card.imageSrc} alt={`Card ${index}`} />
              </div>
              <div className="Cccard_content">
                <h2 className="Cccard_title">{card.title}</h2>
                <p className="Cccard_text">{card.text}</p>
                <a className="Cccard_btn"  href="/cusform"><button>Create </button></a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerCcat;
