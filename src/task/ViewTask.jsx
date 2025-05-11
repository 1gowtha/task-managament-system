import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

export default function ViewTask() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const displayTasks = async () => {
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

    useEffect(() => {
        displayTasks();
    }, []);

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`${config.url}/task/deletetask`, {
                params: { id }
            });
            if (response.data) {
                alert(response.data);
                await displayTasks();
            }
        } catch (err) {
            const errorMessage = err.response 
                ? `Server responded with ${err.response.status}: ${err.response.data.message || err.response.data}`
                : `Network error: ${err.message}`;
            setError(errorMessage);
            console.error("Error details:", err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: "bold" }}>
                <u>View All Tasks</u>
            </Typography>

            {loading ? (
                <Typography align="center">Loading tasks...</Typography>
            ) : error ? (
                <Typography align="center" color="error">
                    {error}
                </Typography>
            ) : tasks.length === 0 ? (
                <Typography align="center" color="textSecondary">
                    No Tasks Found
                </Typography>
            ) : (
                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                    <Table>
                        <TableHead style={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell><strong>Date</strong></TableCell>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell><strong>Priority</strong></TableCell>
                                <TableCell><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.id}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.date}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>{task.priority}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            startIcon={<DeleteIcon />} 
                                            onClick={() => deleteTask(task.id)}
                                            color="error"
                                            size="small"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
