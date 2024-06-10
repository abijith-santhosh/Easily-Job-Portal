export default class JobsModel{
    constructor(id,category,designation,cName,location,salary,skills,applyBy,openings,recruiterId){
        this.id = id;
        this.category = category;
        this.designation = designation;
        this.cName = cName;
        this.location = location;
        this.salary = salary;
        this.skills = skills;
        this.applyBy = applyBy;
        this.openings = openings;
        this.recruiterId = recruiterId;
    }

    // updates the job using jobId
    static update(id, category, designation, cName, location, salary, skills, applyBy, openings,recruiterId) {
        let index = jobs.findIndex((job) => job.id == id);
        if (index !== -1) {
            let updatedJob = new JobsModel(id, category, designation, cName, location, salary, skills, applyBy, openings,recruiterId);
            jobs[index] = updatedJob;
            return updatedJob; 
        }
    }

    // gets the jobs array
    static getData(){
        return jobs;
    }

    // get the jobs by id
    static getById(id){
        return jobs.find(job=>job.id == id);
    }

    // add the jobs to jobs array
    static add(category,designation,cName,location,salary,skills,applyBy,openings,recruiterId){
        const loggedInRecruiterId = recruiterId;
        let newJobs = new JobsModel(
            jobs.length+1,
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
        jobs.push(newJobs);

    }
    // remove the jobs with jobId
    static remove(id,recruiterId){
        const index = jobs.findIndex((job)=>job.id == id);
        jobs.splice(index,1);
    }
    
    
    
}

// jobs array
var  jobs = [
    new JobsModel(1, "Tech", "SDE", "Coding Ninjas", "Gurgaon HR Ind Remote", "14-20lpa", ["React", "NodeJs", "JS", "SQL", "MONGODB", "Express", "AWS"],"30 Aug 2023",5),
    new JobsModel(2, "Tech", "SDE", "ZOHO Corp", "Chennai", "10-15lpa", ["React", "NodeJs", "JS", "SQL", "MONGODB", "Express", "AWS"],"30 Aug 2023",6),
    new JobsModel(3, "Non-Tech", "HR", "XYZ Corp", "Banglore HR Ind Remote", "6-11lpa", ["NodeJs", "JS", "SQL", "MONGODB","AWS","OOPS"],"30 Aug 2023",3),

]