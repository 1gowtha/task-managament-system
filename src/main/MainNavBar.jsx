import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './style.css';
import UserLogin from '../User/UserLogin';
import UserRegistration from '../User/UserRegistration';
import AdminRegistration from '../admin/AdminRegistration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import ManagerLogin from '../manager/ManagerLogin';
import NotFound from './NotFound';

export default function MainNavBar() 
{
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Task Management System</div>
        <ul className="nav-links">
        <li className="dropdown">
            <span>Login ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/userlogin">User</Link></li>
              <li><Link to="/managerlogin">Manager</Link></li>
              <li><Link to="/adminlogin">Admin</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <span>Register ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/userregistration">User Registration</Link></li>
              <li><Link to="/adminregistration">Admin Registration</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/userregistration" element={<UserRegistration />} exact />
        <Route path="/adminregistration" element={<AdminRegistration />} exact />
        <Route path="/userlogin" element={<UserLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/managerlogin" element={<ManagerLogin />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}