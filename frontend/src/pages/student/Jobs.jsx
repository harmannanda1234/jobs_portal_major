import { useEffect, useState } from 'react';
import { getAllJobs, applyToJob } from '../../api/studentApi';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token'); // JWT from login

  // Fetch all jobs on page load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs(token);
        setJobs(data.jobs || []);
      } catch (error) {
        setMessage('Failed to fetch jobs.');
      }
    };
    fetchJobs();
  }, [token]);

  // Handle Apply Button Click
  const handleApply = async (jobId) => {
    try {
      const res = await applyToJob(jobId, token);
      setMessage(res.message || 'Applied successfully!');
    } catch (err) {
      setMessage('Error while applying.');
    }
  };

  return (
    <div>
      <h2>Available Jobs</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <ul>
        {jobs.map((job) => (
          <li key={job.id} style={{ marginBottom: '1rem' }}>
            <strong>{job.title}</strong> – {job.description}
            <br />
            <button onClick={() => handleApply(job.id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;