import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    navigate('/admin/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/admin/dashboard" style={{ margin: '0 1rem' }}>Dashboard</Link>
      <Link to="/admin/jobs" style={{ margin: '0 1rem' }}>Jobs</Link>
      <Link to="/admin/jobs/new" style={{ margin: '0 1rem' }}>Create Job</Link>
      <Link to="/admin/applications" style={{ margin: '0 1rem' }}>Applications</Link>
      <Link to="/admin/status" style={{ margin: '0 1rem' }}>Status</Link>
      <button onClick={handleLogout} style={{ marginLeft: '2rem' }}>Logout</button>
    </nav>
  );
};

export default AdminNavbar;