import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css';

const Login = () => {
  const [enroll_id, setEnrollId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enroll_id, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Directly get the token from the response JSON
        const token = data.token;

        if (token) {
          // Store the token in localStorage
          localStorage.setItem('token', token);

          // Redirect to the dashboard page
          navigate('/student/dashboard');
        } else {
          setError('Token not found in the response');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Student Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enrollment ID"
            value={enroll_id}
            onChange={(e) => setEnrollId(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
