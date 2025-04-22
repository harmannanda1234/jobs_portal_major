import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/student/login'), 1500);
    } else {
      setMessage(data.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Student Signup</h2>
      <form onSubmit={handleSignup}>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type='submit'>Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentSignup;