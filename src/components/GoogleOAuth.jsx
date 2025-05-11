// components/GoogleOAuth.js
import { useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';

const GoogleOAuth = ({ userType }) => {
  const navigate = useNavigate();
  const { 
    setIsAdminLoggedIn, 
    setIsUserLoggedIn, 
    setIsManagerLoggedIn,
    setUserInfo
  } = useAuth();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(`${config.url}/${userType}/googlelogin`, {
        credential: credentialResponse.credential
      });

      if (response.status === 200) {
        // Set the appropriate login state based on userType
        if (userType === 'admin') {
          setIsAdminLoggedIn(true);
          navigate("/adminhome");
        } else if (userType === 'user') {
          setIsUserLoggedIn(true);
          navigate("/userhome");
        } else if (userType === 'manager') {
          setIsManagerLoggedIn(true);
          navigate("/managerhome");
        }
        
        // Store user info if needed
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  useEffect(() => {
    /* Global Google API */
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript();
    }

    window.handleGoogleLogin = handleGoogleLogin;

    return () => {
      if (window.handleGoogleLogin) {
        delete window.handleGoogleLogin;
      }
    };
  }, []);

  return (
    <div className="google-signin">
      <div 
        id="g_id_onload"
        data-client_id={config.googleClientId}
        data-callback="handleGoogleLogin"
        data-context="signin"
      ></div>
      <div 
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  );
};

export default GoogleOAuth;
