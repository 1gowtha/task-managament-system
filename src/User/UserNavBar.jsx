import { Routes, Route, Link } from 'react-router-dom';
import './user.css';
import UserHome from './UserHome';
import UserProfile from './UserProfile';
import UpdateProfile from './UpdateProfile';
import { useAuth } from '../contextapi/AuthContext';
import Home from '../main/Home';
import AddTask from '../task/AddTask';
import ViewTask from '../task/ViewTask';
import Notifications from '../task/Notifications';
import CompletedTasks from './CompletedTasks';
import UserLogin from './UserLogin';  // Added import

export default function UserNavBar() {
  const { setIsUserLoggedIn } = useAuth(); 

  const handleLogout = () => {
    setIsUserLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome User</div>
        <ul className="nav-links">
          <li><Link to="/userhome">Home</Link></li>
          <li><Link to="/addtask">Add Task</Link></li>
          <li><Link to="/viewtask">View Task</Link></li>
          <li><Link to="/completedtasks">CompletedTasks</Link></li>
          <li><Link to="/userprofile">User Profile</Link></li>
          <li><Link to="/updateprofile">Update Profile</Link></li>
          <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/userhome" element={<UserHome />} exact />
        <Route path="/addtask" element={<AddTask/>} exact/>
        <Route path="/viewtask" element={<ViewTask/>} exact/>
        <Route path="/completedtasks" element={<CompletedTasks/>} exact/>
        <Route path ="/userprofile" element={<UserProfile/>} exact/>
        <Route path ="/updateprofile" element={<UpdateProfile/>} exact/>
        <Route path="/userlogin" element={<UserLogin />} exact />  {/* Added route */}
        <Route path="/" element={<Home/>} exact />
      </Routes>
    </div>
  );
}
