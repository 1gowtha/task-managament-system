import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import UserNavBar from "./User/UserNavBar";
import ManagerNavBar from "./manager/ManagerNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AppContent() {
  const { isAdminLoggedIn, isUserLoggedIn, isManagerLoggedIn } = useAuth(); // 

  return (
    <div>
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isUserLoggedIn ? ( // 
          <UserNavBar />       // 
        ) : isManagerLoggedIn ? (
          <ManagerNavBar />
        ) : (
          <MainNavBar />
        )}
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
