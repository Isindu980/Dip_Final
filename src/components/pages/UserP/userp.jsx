import React, { useState } from 'react';


const UserDetailsCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar} alt="User Avatar" />
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-1234',
    avatar: 'https://placekitten.com/150/150', 
  });

  return (
    <div className="App">
      <UserDetailsCard user={user} />
    </div>
  );
};

export default App;
