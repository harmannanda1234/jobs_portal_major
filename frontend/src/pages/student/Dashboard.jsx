import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // get token from localStorage

    axios
      .get("http://localhost:5000/jobs", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setJobs(res.data.jobs))
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, []);

  const handleApply = (jobId) => {
    navigate(`jobs/apply`)
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Job Opportunities For You</h2>
      <div className="job-card-grid">
        {jobs.map((job) => (
          <div key={job.job_id} className="job-card">
            <div className="job-card-header">
              <h3 className="job-title">{job.title}</h3>
              <span className="job-type">{job.type || "Full-time"}</span>
            </div>
            <p className="company-name">{job.company}</p>
            <p className="job-description">
              {job.description || "No description provided."}
            </p>
            <div className="apply-button-container">
              <button
                onClick={() => handleApply(job.job_id)}
                className="apply-button"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
