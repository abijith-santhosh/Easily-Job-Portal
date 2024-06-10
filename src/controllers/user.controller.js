import UserModel from "../models/user.model.js";

export default class UserController{
    // renders the landing page
    getHome(req,res){
        res.render("landing",{userName:req.session.userName}); 
    }

    // after register takes to  the login page
    postRegister(req,res,next){
        const {name,email,password} = req.body;
        UserModel.addRegister(name,email,password);
        console.log(req.body);
        res.render('login',{errorMessage:null});
        
    }

    // takes to the login page
    getLogin(req,res){
        res.render("login",{errorMessage:null});
    }

    // checks the login Credentials
    checkUser(req, res, next) {
        const { email, password } = req.body;
        const user = UserModel.isValidUser(email, password);
        if (!user) {
            return res.render("login", { errorMessage: "Invalid Credentials" });
        }
        req.session.userId = user.id;
        req.session.userName = user.name;
        req.session.userEmail = user.email;
        console.log(email);
        console.log(password);

        res.redirect("/jobs")
    }

    // renders unAuthorized page
    unAuthorized(req,res){
        res.render('un-authorize',{userName:req.session.userName});
    }
    
    // Destros the session and logout from the page
    logOutUser(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.clearCookie('lastVisit');
                res.redirect("/");
            }
        });
    }
    
    
    
}