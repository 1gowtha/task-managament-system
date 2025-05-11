import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ViewManagers() {
    const [managers, setManagers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const fetchManagers = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await axios.get(`${config.url}/admin/viewalleventmanagers`);
            if (response.data && response.data.length > 0) {
                setManagers(response.data);
            } else {
                setError("No event managers found");
            }
        } catch (err) {
            setError(err.response?.data || "Failed to fetch managers. Please try again.");
            console.error("Error fetching managers:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteManager = async (id) => {
        if (!window.confirm("Are you sure you want to delete this manager?")) return;
        
        try {
            setLoading(true);
            const response = await axios.delete(`${config.url}/admin/deletemanager/${id}`);
            alert(response.data);
            fetchManagers();
        } catch (err) {
            setError(err.response?.data || "Failed to delete manager. Please try again.");
            console.error("Error deleting manager:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchManagers();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
                <u>View All Event Managers</u>
            </h3>

            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
            
            {error ? (
                <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
                    {error}
                </p>
            ) : managers.length === 0 && !loading ? (
                <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
                    No event managers found
                </p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Mobile No</th>
                            <th>Company Name</th>
                            <th>Company Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager) => (
                            <tr key={manager.id}>
                                <td>{manager.id}</td>
                                <td>{manager.name}</td>
                                <td>{manager.gender}</td>
                                <td>{manager.dob}</td>
                                <td>{manager.email}</td>
                                <td>{manager.username}</td>
                                <td>{manager.password}</td>
                                <td>{manager.mobileno}</td>
                                <td>{manager.company_name}</td>
                                <td>{manager.company_location}</td>
                                <td>
                                    <Button 
                                        variant="outlined" 
                                        color="error"
                                        startIcon={<DeleteIcon/>}  
                                        onClick={() => deleteManager(manager.id)}
                                        disabled={loading}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
