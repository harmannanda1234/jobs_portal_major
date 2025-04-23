import { useState } from 'react';

const AdminCreateJob = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('admin-token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/admin/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description: desc }),
    });
    const data = await res.json();
    setMessage(data.message);
    setTitle('');
    setDesc('');
  };

  return (
    <div>
      <h2>Create New Job</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required />
        <button type="submit">Post Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminCreateJob;