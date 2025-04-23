import { useEffect, useState } from 'react';

const AdminApplications = () => {
  const [apps, setApps] = useState([]);
  const token = localStorage.getItem('admin-token');

  useEffect(() => {
    const fetchApps = async () => {
      const res = await fetch('http://localhost:5000/jobs/status', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setApps(data.applications || []);
    };
    fetchApps();
  }, [token]);

  return (
    <div>
      <h2>All Applications</h2>
      <ul>
        {apps.map((app, i) => (
          <li key={i}>
            Student ID: {app.student_id} – Job ID: {app.job_id} – Status: {app.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminApplications;
