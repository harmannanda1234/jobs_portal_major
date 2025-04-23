import { useEffect, useState } from 'react';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('admin-token');

  const fetchJobs = async () => {
    const res = await fetch('http://localhost:5000/jobs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setJobs(data.jobs || []);
  };

  const deleteJob = async (id) => {
    const res = await fetch(`http://localhost:5000/admin/job/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessage(data.message);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>All Posted Jobs</h2>
      {message && <p>{message}</p>}
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>{job.title}</strong> – {job.description}
            <button onClick={() => deleteJob(job.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminJobs;