import {body,validationResult} from "express-validator";

// Validates the applicants form
 const validationMiddleware = async (req,res,next)=>{
    const rules =[
        body("name").notEmpty().withMessage("Name is Required"),
        body("email").isEmail().withMessage("Email is Invalid"),
        body("contact").notEmpty().withMessage('Contact number is required')
        .isMobilePhone('any', { strictMode: false }).withMessage('Invalid contact number'),
        
    ];

    await Promise.all(rules.map(rule=>rule.run(req)));

    const ValidationError = validationResult(req);
    if(!ValidationError.isEmpty()){
        return res.redirect('/jobDetails')
    }
    next();
}

export default validationMiddleware;