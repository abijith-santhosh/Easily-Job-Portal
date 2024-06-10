import ApplicantsModel from "../models/applicant.model.js";
import sendMail from "../middlewares/send-mail.middleware.js";

export default class  ApplicantsController{
    // renders the applicants page
    getApplicants(req,res,next){
        let applicants = ApplicantsModel.getApplicants();
        res.render('applicants',{applicants,userEmail:req.session.Email});
    }

    // add the applicants to the applicants array and send the applicant a mail using sendmail 
    async addApplicants(req,res,next){
        const {name,email,contact} = req.body;
        const resume = "uploads/"+req.file.filename;
        const jobId = req.params.id;
        ApplicantsModel.addNewApplicants(name,email,contact,resume,jobId);
        const applicantsEmail = req.body.email;
        await sendMail(applicantsEmail);
        res.redirect('/jobs');
    }

    // renders the applicants page
    applicantsView(req,res,next){
        const jobId = req.params.id;
        let applicants = ApplicantsModel.getApplicantsForJob(jobId);
        if(applicants){
            applicants = applicants.map((applicant, index) => ({
                ...applicant,
                id: index + 1 // Start from 1 for each job
            }));
            res.render("applicants",{applicants,userEmail:req.session.userEmail});
        }else{
            res.status(401).render("not-found");
        }
    }

}