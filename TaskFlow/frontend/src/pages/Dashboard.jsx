import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data.tasks || []);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'In Progress': 'status-in-progress',
      'Pending': 'status-pending',
      'Completed': 'status-completed',
    };
    return statusMap[status] || 'status-pending';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>TaskFlow Dashboard</h1>
        </div>
        <div className="user-info">
          {user.name && <span>Welcome, {user.name}</span>}
          <button className="btn btn-danger" style={{ width: 'auto', padding: '0.5rem 1.25rem' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>No tasks found. Create your first task!</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description || 'No description'}</p>
              </div>
              <span className={`status-badge ${getStatusClass(task.status)}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;