import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';
import './user.css';

export default function UserLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { captcha, refreshCaptcha } = useAuth();

  const navigate = useNavigate();
  const { setIsUserLoggedIn, setUserInfo } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.captcha !== captcha) {
      setError("Invalid CAPTCHA");
      refreshCaptcha();
      return;
    }

    try {
      const response = await axios.post(`${config.url}/user/checkuserlogin`, {
        username: formData.username,
        password: formData.password
      });
      
      if (response.status === 200) {
        setIsUserLoggedIn(true);
        setUserInfo(response.data);
        navigate("/userhome");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
      refreshCaptcha();
    }
  };

  return (
    <div className="login-container">
      <h3>User Login</h3>
      {message ? (
        <p className="success-message">{message}</p>
      ) : (
        <p className="error-message">{error}</p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>CAPTCHA: {captcha}</label>
          <input type="text" id="captcha" value={formData.captcha} onChange={handleChange} required />
          <button type="button" onClick={refreshCaptcha}>Refresh</button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}