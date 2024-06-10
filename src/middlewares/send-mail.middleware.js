

// mail using nodemailer
import nodemailer from "nodemailer";

// mailing the applicants who applied for job using nodemailer
async function sendMail(applicantEmail){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"abijith459@gmail.com",
            pass:"ynmdccmxffupczke"
        }
    });
    const mailOptions={
        from:"abijith459@gmail.com",
        to:applicantEmail,
        subject:"Job Application Received",
        html: `<style>
        /* Add your CSS styles here */
        body {
            font-family: Arial, sans-serif;
            
        }
        p,h1{
            text-align:center;
        }
        img {
            width: 300px; 
            height: 300px;
            display: block; 
            margin: 0 auto; 
        }
    </style>
        
        <h1>Job Application Confirmation</h1>
        <p>Dear User,</p>
        <p>Thank you for applying for a job at Easily. We have received your application and are currently reviewing it.</p>
        <p>If your qualifications match our requirements, we will contact you for the next steps of the selection process.</p>
        <p>Thank you for your interest in joining our team!</p>
        <p>Best regards,<br />The Easily Team</p>
    `
    }
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Mail Sent Successfully');
    } catch (error) {
        console.log('Mail Failed to sent '+error);
    }
    
}

export default sendMail;