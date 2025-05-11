import { Routes, Route, Link } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import AddManager from './AddManager';
import ViewManagers from './ViewManagers';
import ViewUsers from './ViewUsers'; 
import { useAuth } from '../contextapi/AuthContext';
import Home from '../main/Home';
import AddUser from './AddUser';
import ApproveTask from './ApproveTask';
import ApproveUser from './ApproveUser';
import AdminLogin from './AdminLogin';  // Added import
import UserLogin from '../User/UserLogin';  // Added import

export default function AdminNavBar() 
{
  const { setIsAdminLoggedIn } = useAuth(); 

  const handleLogout = () => 
  {
    setIsAdminLoggedIn(false); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Admin</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/addeventmanager">Add Managers</Link></li>
          <li><Link to="/viewmanagers">View Managers</Link></li>
          <li><Link to="/addusers">Add Users</Link></li>
          <li><Link to="/viewallusers">View All Users</Link></li>
          <li><Link to="/approvetask">Approve Task</Link></li>
          <li><Link to="/approveuser">Approve User</Link></li>
          <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/addeventmanager" element={<AddManager />} exact />
        <Route path="/viewmanagers" element={<ViewManagers />} exact />
        <Route path="/addusers" element={<AddUser />} exact />
        <Route path="/viewallusers" element={<ViewUsers />} exact /> 
        <Route path="/approvetask" element={<ApproveTask/>} exact />
        <Route path="/approveuser" element={<ApproveUser/>} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />  {/* Added route */}
        <Route path="/userlogin" element={<UserLogin />} exact />    {/* Added route */}
        <Route path="/" element={<Home/>} exact />
      </Routes>
    </div>
  );
}
