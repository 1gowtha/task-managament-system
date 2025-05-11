import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompletedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetchCompletedTasks();
        }
    }, [userId]);

    const fetchCompletedTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:2025/task/completedtasks/${userId}`);
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching completed tasks:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Completed Tasks</h2>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : tasks.length === 0 ? (
                <div className="alert alert-info">No completed tasks found</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Priority</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.date}</td>
                                    <td>{task.priority}</td>
                                    <td>
                                        <span className="badge bg-success">Approved</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompletedTasks;