import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        email: '',
        mobileno: '',
        location: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userInfo && userInfo.id) {
                    const response = await axios.get(`${config.url}/user/getuserbyid/${userInfo.id}`);
                    if (response.data) {
                        const user = response.data;
                        setFormData({
                            name: user.name,
                            gender: user.gender,
                            dob: user.dob,
                            email: user.email,
                            mobileno: user.mobileno,
                            location: user.location
                        });
                    }
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        fetchUserData();
    }, [userInfo]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                user: { id: userInfo.id },
                name: formData.name,
                gender: formData.gender,
                dob: formData.dob,
                email: formData.email,
                mobileno: formData.mobileno,
                location: formData.location
            };

            const response = await axios.post(`${config.url}/user/requestprofileupdate`, requestData);
            setMessage(response.data);
            setError('');
            navigate('/userprofile');
        } catch (err) {
            setMessage('');
            setError(err.response?.data || "An error occurred while updating profile");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0" style={{textAlign:'center'}}>Update Profile</h2>
                </div>
                <div className="card-body">
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" name="name" 
                                           value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                    <select className="form-select" name="gender" 
                                            value={formData.gender} onChange={handleChange} required>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date of Birth</label>
                                    <input type="date" className="form-control" name="dob" 
                                           value={formData.dob} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" 
                                           value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mobile No</label>
                                    <input type="text" className="form-control" name="mobileno" 
                                           value={formData.mobileno} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input type="text" className="form-control" name="location" 
                                           value={formData.location} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary me-2">Submit Update Request</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/userprofile')}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
