import JobsModel from "../models/jobs.model.js";

// Only a recruiter who posted the job can have access to it
const authorizeJobAccess = (req, res, next) => {
    const loggedInRecruiterId = req.session.userId; 
    const jobId = req.params.id; 

    // Check if the job exists and is associated with the logged-in recruiter
    const job = JobsModel.getById(jobId);
    console.log(job);
    if (!job || job.recruiterId !== loggedInRecruiterId) {
        return res.status(403).render("un-authorize");
    }

    next();
};

export default authorizeJobAccess;
