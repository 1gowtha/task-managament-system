import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import config from '../config';



export default function AdminHome() {

  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);

  const [managerCount, setManagerCount] = useState(0);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
  const fetchCounts = async () => {
    try {
      const userRes = await axios.get(`${config.url}/admin/usercount`);
      console.log("User count response:", userRes.data);

      const managerRes = await axios.get(`${config.url}/admin/managercount`);
      console.log("Manager count response:", managerRes.data);

      setUserCount(userRes.data);
      setManagerCount(managerRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching counts:", error);
      setLoading(false);
    }
  };

  fetchCounts();
}, []);




  



  if (loading) {

    return <div style={{ textAlign: 'center', padding: '30px' }}>Loading counts...</div>;

  }



  return (

    <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>

      <h2>Welcome to Admin Dashboard</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '30px', flexWrap: 'wrap' }}>

        <div

          onClick={() => navigate('/viewallusers')}

          style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px', cursor: 'pointer' }}

        >

          <h3 style={{ marginBottom: '10px', color: '#333' }}>Users</h3>

          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>{userCount}</p>

        </div>

        <div
          onClick={() => navigate('/viewmanagers')}
          style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px', cursor: 'pointer' }}
        >
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Managers</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>{managerCount}</p>
        </div>

      </div>

    </div>

  );

}
