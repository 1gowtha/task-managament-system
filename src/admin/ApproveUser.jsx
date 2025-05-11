import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { Table, Button, Alert } from 'react-bootstrap';

export default function ApproveUser() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get(`${config.url}/user/pendingprofileupdates`);
                setRequests(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch pending requests");
                setLoading(false);
                console.error(err);
            }
        };

        fetchPendingRequests();
    }, []);

    const handleApprove = async (requestId) => {
        try {
            const response = await axios.post(`${config.url}/user/approveprofileupdate/${requestId}`);
            setMessage(response.data);
            setError('');
            // Refresh the list
            const updatedResponse = await axios.get(`${config.url}/user/pendingprofileupdates`);
            setRequests(updatedResponse.data);
        } catch (err) {
            setMessage('');
            setError(err.response?.data || "Failed to approve request");
        }
    };

    const handleReject = async (requestId) => {
        try {
            const response = await axios.post(`${config.url}/user/rejectprofileupdate/${requestId}`);
            setMessage(response.data);
            setError('');
            // Refresh the list
            const updatedResponse = await axios.get(`${config.url}/user/pendingprofileupdates`);
            setRequests(updatedResponse.data);
        } catch (err) {
            setMessage('');
            setError(err.response?.data || "Failed to reject request");
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Pending Profile Update Requests</h2>
            
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {requests.length === 0 ? (
                <Alert variant="info">No pending profile update requests</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Request Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.user.id}</td>
                                <td>{request.name}</td>
                                <td>{request.email}</td>
                                <td>{request.mobileno}</td>
                                <td>{new Date(request.requestDate).toLocaleString()}</td>
                                <td>
                                    <Button variant="success" size="sm" 
                                            onClick={() => handleApprove(request.id)} className="me-2">
                                        Approve
                                    </Button>
                                    <Button variant="danger" size="sm" 
                                            onClick={() => handleReject(request.id)}>
                                        Reject
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
