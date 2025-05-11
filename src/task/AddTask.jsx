import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddTask() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    priority: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/task/addtask`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          title: '',
          date: '',
          description: '',
          priority: ''
        });
      }
    } catch (error) {
      if(error.response) {
        setMessage('');
        setError(error.response.data);
      } else {
        setMessage('');
        setError("An unexpected error occurred.");
      }
    }
  };
  
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add Task</h3>
      {message ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>{message}</p>
      ) : (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="title" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
          <input 
            type="text" 
            id="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="date" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Deadline</label>
          <input 
            type="date" 
            id="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="description" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
          <input 
            type="text" 
            id="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="priority" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Priority</label>
          <select 
            id="priority" 
            value={formData.priority} 
            onChange={handleChange} 
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
