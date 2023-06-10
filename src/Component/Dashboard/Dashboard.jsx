import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
  
    return (
      <div>
        <h2>Welcome, {user.displayName}</h2>
        <p>Email: {user.email}</p>
        <p>Photo: {user.photoURL}</p>
        
      </div>
    );
  };
  
  export default Dashboard;
  