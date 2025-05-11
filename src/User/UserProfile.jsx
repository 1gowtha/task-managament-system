import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';
import { Link } from 'react-router-dom';

export default function UserProfile() {
    const { userInfo } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [photo, setPhoto] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userInfo && userInfo.id) {
                    const response = await axios.get(`${config.url}/user/getuserbyid/${userInfo.id}`);
                    if (response.data) {
                        setUser(response.data);
                    } else {
                        setError("User data not found");
                    }
                }
            } catch (err) {
                setError("Failed to load user data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userInfo]);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhoto(null);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
                {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                No user data available
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f0f2f5',
                padding: '100px'
            }}
        >
            <h2 style={{ fontSize: '26px', color: '#333', marginBottom: '20px' }}>
                User Profile
            </h2>

            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '25px',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto 10px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: photo ? 'transparent' : '#007bff',
                        color: '#fff',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        userSelect: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={triggerFileInput}
                    title="Change Profile Photo"
                >
                    {photo ? (
                        <img
                            src={photo}
                            alt="User Avatar"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                    ) : (
                        user.name.charAt(0).toUpperCase()
                    )}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '4px',
                            right: '4px',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="14px"
                            height="14px"
                        >
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                        </svg>
                    </div>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />

                {photo && (
                    <button
                        onClick={handleRemovePhoto}
                        style={{
                            display: 'block',
                            margin: '10px auto',
                            padding: '6px 12px',
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Remove Photo
                    </button>
                )}

                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> @{user.username}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Date of Birth:</strong> {user.dob}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Mobile No:</strong> {user.mobileno}</p>
                <p><strong>Location:</strong> {user.location}</p>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link
                        to="/updateprofile"
                        style={{
                            textDecoration: 'none',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}
                    >
                        Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}