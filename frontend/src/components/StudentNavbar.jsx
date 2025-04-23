import { Link, useNavigate } from 'react-router-dom';

const StudentNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/student/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/student/dashboard" style={{ margin: '0 1rem' }}>Dashboard</Link>
      <Link to="/student/jobs" style={{ margin: '0 1rem' }}>Jobs</Link>
      <Link to="/student/applications" style={{ margin: '0 1rem' }}>Applications</Link>
      <Link to="/student/profile" style={{ margin: '0 1rem' }}>Profile</Link>
      <button onClick={handleLogout} style={{ marginLeft: '2rem' }}>Logout</button>
    </nav>
  );
};

export default StudentNavbar;