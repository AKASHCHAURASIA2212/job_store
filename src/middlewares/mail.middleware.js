// 1. Import nodemailer
import nodemailer from 'nodemailer'
import welcomeTemplate from '../mailer/sendWelcomeMail.js';

// 2.config email and send it

export default async function MailMiddleware(req,res,next){

    // 1. Create an email transpoter
    // SMTP (Simple Mail Transfer Protocol)
 console.log(req.body);
    let email = req.body.email;
    let username = req.body.username;
    console.log("inside mail sender ",email);
    const transpoter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:'codingninjas2k16@gmail.com',
            pass:'slwvvlczduktvhdj'
        }
    });

    // 2.configure email content

    const mailOptions = {
        from:'akashmailbox12345@gmail.com',
        to:email,
        subject:"Welcone To Job Store",
        html:welcomeTemplate(username)
    };

    try {
        let result  =await transpoter.sendMail(mailOptions);
        console.log("Email Send Successfully");
    } catch (error) {
        console.log("Something Went Wrong 🥶",error); 
    }
    next()

}

