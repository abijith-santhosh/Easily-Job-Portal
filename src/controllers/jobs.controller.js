import JobsModel from "../models/jobs.model.js";
import ApplicantsModel from "../models/applicant.model.js";

export default class JobsController {
  // Gets Jobs from JobsModel and displays
  getJobs(req, res, next) {
    let jobs = JobsModel.getData();
    res.render("jobs", { jobs, userName: req.session.userName });
  }

  // getJobDetails page displays jobs with their id
  getJobDetails(req, res, next) {
    const id = req.params.id;
    let jobs = JobsModel.getById(id);
    if (!jobs) {
      res.status(404).render("error", { message: "Job not found" });
      return;
    }

    const applicantCount =  ApplicantsModel.getApplicantsCountForJob(id);
    res.render("jobDetails", {
      jobs: [jobs],
      applicantCount,
      userName: req.session.userName,
      userEmail: req.session.userEmail,
    });
  }

  // postjob Page
  postJobsView(req, res, next) {
    res.render("postjob", {
      userName: req.session.userName,
      userEmail: req.session.userEmail,
    });
  }

  // posts job using jobmodel add()
  postJobs(req, res, next) {
    const recruiterId = req.session.userId;
    const {
      job_category,
      job_designation,
      job_location,
      company_name,
      salary,
      number_of_openings,
      skills_required,
      apply_by,
    } = req.body;

    JobsModel.add(
      job_category,
      job_designation,
      company_name,
      job_location,
      salary,
      skills_required,
      apply_by,
      number_of_openings,
      recruiterId
    );

    res.redirect("/jobs");
  }

  // Job Update View
  getJobUpdateView(req, res, next) {
    const id = req.params.id;
    let job = JobsModel.getById(id);
    if (job) {
      res.status(201).render("update-job", {
        job,
        userName: req.session.userName,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(401).render("not-found");
    }
  }

  // Post UpdateView using update() in jobsModel and checks only the logged user and posted recruiter can modify.
  postJobsUpdateview(req, res, next) {
    const jobId = req.params.id;
    const loggedInRecruiterId = req.session.userId; // Get the ID of the logged-in user

    // Fetch the job by ID
    const job = JobsModel.getById(jobId);
    if (!job) {
      return res.status(404).render("error", { message: "Job not found" });
    }

    // Check if the logged-in user is authorized to update the job
    if (job.recruiterId !== loggedInRecruiterId) {
      return res.status(403).render("un-authorize", {
        message: "You are not authorized to update this job",
      });
    }

    // Update the job with the provided details
    const {
      category,
      designation,
      cName,
      location,
      salary,
      skills,
      applyBy,
      openings,
    } = req.body;

    JobsModel.update(
      jobId,
      category,
      designation,
      cName,
      location,
      salary,
      skills,
      applyBy,
      openings,
      loggedInRecruiterId
    );

    // Redirect to the updated job details page
    res.redirect(`/jobs/${jobId}`);
  }


  // remove Jobs with id using remove() in jobsModel
  removeJobsView(req, res, next) {
    const jobId = req.params.id;
    const loggedInRecruiterId = req.session.userId; // Get the ID of the logged-in user

    // Fetch the job by ID
    const job = JobsModel.getById(jobId);
    if (!job) {
      return res.status(404).render("error", { message: "Job not found" });
    }

    // Check if the logged-in user is authorized to delete the job
    if (job.recruiterId !== loggedInRecruiterId) {
      return res.status(403).render("un-authorize", {
        message: "You are not authorized to delete this job",
      });
    }

    // Remove the job
    JobsModel.remove(jobId, loggedInRecruiterId);
    res.redirect("/jobs");

    // Redirect or render the updated job list
  }

// error page rendering
  getErrorPage(req, res) {
    res.render("not-found");
  }

  // json objects of jobs for client-side to implement search feature
  jsonJobs(req, res) {
    try {
      // Retrieve jobs data from the model
      let jobs = JobsModel.getData();
      // Return the jobs data as JSON response
      res.json({ jobs });
    } catch (error) {
      // Handle any errors and send an error response
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  }
}
