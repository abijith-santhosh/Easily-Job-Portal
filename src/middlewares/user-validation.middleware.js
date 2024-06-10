import {body,validationResult} from "express-validator";

// validates the register form
const userValidationMiddleware = async (req,res,next)=>{

    const rules = [
        body("name").notEmpty().withMessage("Name is Required"),
        body("email").isEmail().withMessage("Email is Invaild"),
        body('password')
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8 and 20 characters long'),
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.render('landing', { errorMessage: errorMessages });
    }
    next();
}

// validates the login form
const loginValidationMiddleware = async (req,res,next)=>{
    const rules = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long'),
    ]

    await Promise.all(rules.map(rule=> rule.run(req)));

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render("login",{errorMessage:errors.array()[0].msg});
    }
    next();

}

export default {userValidationMiddleware,loginValidationMiddleware} ;
