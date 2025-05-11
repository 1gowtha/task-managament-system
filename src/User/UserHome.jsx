import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './UserHome.css';
import mainwall from './images/main.png';

export default function UserHome() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.url}/task/viewalltasks`);
        if (response.data && Array.isArray(response.data)) {
          setTasks(response.data);
          setError("");
        } else {
          setError("No tasks found or invalid response format");
        }
      } catch (err) {
        const errorMessage = err.response 
          ? `Server responded with ${err.response.status}: ${err.response.data.message || err.response.data}`
          : `Network error: ${err.message}`;
        setError(errorMessage);
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const pendingTasksCount = tasks.filter(task => !task.status || task.status.toLowerCase() !== 'completed').length;

  return (
    <div
      style={{
        backgroundImage: `url(${mainwall})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        marginTop:'-48px',
      }}
    >
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="quick-stats d-flex justify-content-around flex-wrap">
              <Link to="/viewtask" className="stat-card bg-light p-4 rounded shadow mb-3" style={{ minWidth: '200px', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                <h4>Pending Tasks</h4>
                <p className="display-6 text-primary">{loading ? "..." : pendingTasksCount}</p>
              </Link>
              <Link to="/viewtask" className="stat-card bg-light p-4 rounded shadow mb-3" style={{ minWidth: '200px', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                <h4>Completed Tasks</h4>
                <p className="display-6 text-primary">0</p>
              </Link>
              <Link to="/viewtask" className="stat-card bg-light p-4 rounded shadow mb-3" style={{ minWidth: '200px', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                <h4>Overdue Tasks</h4>
                <p className="display-6 text-primary">{loading ? "..." : pendingTasksCount}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
