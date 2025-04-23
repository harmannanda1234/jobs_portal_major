import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css'; // Add this CSS file below

const AdminLogin = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email, pass }),
      });
      const data = await res.json();

      if (res.ok) {
        // Directly get the token from the response JSON
        const token = data.token;
        if (token) {
          localStorage.setItem('admin-token', token);
          navigate('/admin/dashboard');
        } else {
          setError('Token missing from headers');
        }
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Admin ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
