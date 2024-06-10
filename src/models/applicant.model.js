export default class ApplicantsModel{
    
    constructor(id,name,email,contact,resume,jobId){
        this.id = id;
        this.name= name;
        this.email = email;
        this.contact = contact;
        this.resume = resume;
        this.jobId = jobId;
    }

    // add applicants to the applicants array
    static addNewApplicants(name,email,contact,resume,jobId){
        let newApplicants = new ApplicantsModel(applicants.length+1,name,email,contact,resume,jobId);
        applicants.push(newApplicants);
    }

    // gets the applicants from applicants array
    static getApplicants(){
        return applicants;
    }

    // filter based on applicant id
    static getApplicantsForJob(jobId) {
        return applicants.filter(applicant => applicant.jobId === jobId);
    }

    // gets the applicants length 
    static getApplicantsCountForJob(jobId) {
        return this.getApplicantsForJob(jobId).length;
    }
    }



var applicants = [];