const express = require("express");
const pool = require("../dbconn");
const { protected } = require("../middlewares/verifytoken");

const Jrouter = express.Router();

// list all jobs
Jrouter.get("/", async (req, res) => {
    try {
        const [jobs] = await pool.execute("SELECT * FROM jobs");
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Apply  job
Jrouter.post("/apply", protected, async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    
    const { job_id } = req.body;
    const student_id = req.user.id;

    try {
        const query = "INSERT INTO applications (job_id, stu_id) VALUES (?, ?)";
        await pool.execute(query, [job_id, student_id]);
        res.status(201).json({ message: "Job application submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// application status
Jrouter.get("/status", protected, async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const student_id = req.user.id;

    try {
        const [applications] = await pool.execute(
            "SELECT j.title, j.company, a.status FROM applications a JOIN jobs j ON a.job_id = j.job_id WHERE a.stu_id = ?",
            [student_id]
        );

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = Jrouter;
