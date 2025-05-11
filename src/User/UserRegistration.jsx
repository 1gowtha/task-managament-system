import { useState } from 'react';
import axios from 'axios';
import config from '../config'

export default function UserRegistration() 
{
  
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    username:'',
    password: '',
    mobileno: '',
    location: ''
  });

 
  const [message, setMessage] = useState('');
  
  const [error, setError] = useState('');

  const handleChange = (e) => 
  {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const validatePassword = (password) => {
    const minLength = 7;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < minLength) {
      setError("Password must be at least 7 characters long.");
      return false;
    }
    if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setMessage('');
      return;
    }

    try
    {
        const response = await axios.post(`${config.url}/user/registration`, formData);
        if (response.status === 200) 
        {
            setMessage(response.data);
            setFormData({
              name: '',
              gender: '',
              dob: '',
              email: '',
              username:'',
              password: '',
              mobileno: '',
              location: ''
            });
            setError('');
        }
    } 
    catch (error) 
    {
      if(error.response) 
      {
        setMessage("")
        setError(error.response.data);
      }
      else 
      {
        setMessage("")
        setError("An unexpected error occurred.");
      }
    }

  };
  
  return (
    <div>
      <h3 style={{ textAlign: "center",textDecoration: "underline"}}>User Registration</h3>
      {
            message?
            <p style={{textAlign: "center",color:"green",fontWeight:"bolder"}}>{message}</p>:
            <p style={{textAlign: "center",color:"red",fontWeight:"bolder"}}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile No</label>
          <input type="number" id="mobileno" value={formData.mobileno} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
