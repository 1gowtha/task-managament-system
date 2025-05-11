import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function ApproveTask() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/getprofileupdaterequests`);
        setRequests(response.data || []);
      } catch (err) {
        setError('Failed to load approval requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axios.post(`${config.url}/admin/approveprofileupdate`, { requestId });
      setActionMessage('Request approved successfully');
      setRequests(requests.filter(req => req.id !== requestId));
    } catch (err) {
      setActionMessage('Failed to approve request');
      console.error(err);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`${config.url}/admin/rejectprofileupdate`, { requestId });
      setActionMessage('Request rejected successfully');
      setRequests(requests.filter(req => req.id !== requestId));
    } catch (err) {
      setActionMessage('Failed to reject request');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading approval requests...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Profile Update Approval Requests</h2>
      {actionMessage && <div className="alert alert-info">{actionMessage}</div>}
      {requests.length === 0 ? (
        <p>No pending approval requests.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.userId}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.mobileno}</td>
                <td>{req.location}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => handleApprove(req.id)}>Approve</button>
                  <button className="btn btn-danger" onClick={() => handleReject(req.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
