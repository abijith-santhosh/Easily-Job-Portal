import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import UserController from './src/controllers/user.controller.js';
import JobsController from './src/controllers/jobs.controller.js';
import ApplicantsController from './src/controllers/applicants.controller.js';
import validationMiddleware from './src/middlewares/validate.middleware.js';
import UserValidation from "./src/middlewares/user-validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import { setLastVisit } from "./src/middlewares/last-Visit.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import authorizeJobAccess from "./src/middlewares/recruiter.middleware.js";



const app = express();
const port = 3000;

// Setting up the view engine
app.set("view engine","ejs");
app.set("views",path.join(path.resolve(),"src","views"));

//Setting up the middleware
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:'J9bPe7kK4T',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}));
app.use(express.static("src/views"));
app.use(express.static("public"));

//Creating instances
const userController = new UserController();
const jobsController = new JobsController();
const applicantsController = new ApplicantsController();

//Setting up the routes

//Authentication Routes
app.post("/register",UserValidation.loginValidationMiddleware,userController.postRegister);
app.get("/login",userController.getLogin);
app.post("/login",userController.checkUser);
app.get("/logout",userController.logOutUser);

//Home Route
app.get("/",userController.getHome);

//Job Routes
app.get("/jobs",jobsController.getJobs);
app.get("/jobs/:id",setLastVisit,jobsController.getJobDetails);
app.get("/jobs/:id/update",auth,authorizeJobAccess,jobsController.getJobUpdateView);
app.post("/jobs/:id/update",auth,authorizeJobAccess,setLastVisit,jobsController.postJobsUpdateview);
app.get("/jobs/:id/delete",auth,authorizeJobAccess,jobsController.removeJobsView);

//Applicant Route
app.get("/applicants/:id",auth,authorizeJobAccess,applicantsController.applicantsView);

//Apply Route
app.post("/apply/:id",uploadFile.single('resume'),validationMiddleware,applicantsController.addApplicants);
app.get("/postjob",auth,setLastVisit,jobsController.postJobsView);
app.post("/jobs",jobsController.postJobs);

//404 Error Route
app.get("/404",jobsController.getErrorPage);
app.get('/unauthorized',userController.unAuthorized);

app.get("/jobs-json",jobsController.jsonJobs);




app.listen(port, () => {
    console.log(`Easily app listening on port ${port}!`);
});

