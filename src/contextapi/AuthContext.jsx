import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isManagerLoggedIn, setIsManagerLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [captcha, setCaptcha] = useState(generateCaptcha());

  function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  return (
    <AuthContext.Provider value={{
      isAdminLoggedIn, setIsAdminLoggedIn,
      isUserLoggedIn, setIsUserLoggedIn,
      isManagerLoggedIn, setIsManagerLoggedIn,
      userInfo, setUserInfo,
      captcha, refreshCaptcha
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);