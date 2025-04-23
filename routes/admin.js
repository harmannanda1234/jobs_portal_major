const express = require("express");
const pool = require("../dbconn");
const { protected } = require("../middlewares/verifytoken");

const AdminRouter = express.Router();

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

// Create job
AdminRouter.post("/job", protected, adminOnly, async (req, res) => {
    const { title, company, location, description } = req.body;

    if (!title || !company || !location || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await pool.execute(
            "INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)",
            [title, company, location, description]
        );
        res.status(201).json({ message: "Job posted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Update job
AdminRouter.put("/job/:id", protected, adminOnly, async (req, res) => {
    const { id } = req.params;
    const { title, company, location, description } = req.body;

    try {
        await pool.execute(
            "UPDATE jobs SET title = ?, company = ?, location = ?, description = ? WHERE job_id = ?",
            [title, company, location, description, id]
        );
        res.status(200).json({ message: "Job updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Delete job
AdminRouter.delete("/job/:id", protected, adminOnly, async (req, res) => {
    const { id } = req.params;

    try {
        await pool.execute("DELETE FROM jobs WHERE job_id = ?", [id]);
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = AdminRouter;
