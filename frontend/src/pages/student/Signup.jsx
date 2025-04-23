import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Link to external CSS

const Signup = () => {
  const [enroll_id, setEnrollId] = useState('');
  const [semail, setEmail] = useState('');
  const [sname, setName] = useState('');
  const [spassword, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enroll_id, semail, sname, spassword }),
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
    <div className="signup-container">
      <h2 className="signup-title">Student Signup</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input type="text" placeholder="Enrollment ID" value={enroll_id} onChange={(e) => setEnrollId(e.target.value)} required />
        <input type="email" placeholder="Email" value={semail} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={sname} onChange={(e) => setName(e.target.value)} required />
        <input type="password" placeholder="Password" value={spassword} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      {message && <p className="signup-message">{message}</p>}
    </div>
  );
};

export default Signup;
