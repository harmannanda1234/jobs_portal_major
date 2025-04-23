const BASE_URL = 'http://localhost:5000'; // Change to your backend URL if needed

// GET /jobs - Fetch all jobs
export const getAllJobs = async (token) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    headers: {
      Authorization: `Bearer ${token}`, // Use JWT stored in browser
    },
  });
  return res.json();
};

// POST /jobs/apply - Apply to a job
export const applyToJob = async (jobId, token) => {
  const res = await fetch(`${BASE_URL}/jobs/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ job_id: jobId }),
  });
  return res.json();
};