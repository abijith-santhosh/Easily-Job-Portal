
//Only logged in users can have access to specific features
export const auth = (req,res,next)=>{
    if(req.session.userEmail){
        next();
    }
    else{
        res.render("not-found");
    }
}