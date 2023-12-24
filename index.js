import dotenv from 'dotenv';
dotenv.config();
// packages import
import express from 'express';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
const uploadDirectory = './uploads';
import bodyParser from 'body-parser';
import ejsLayouts from 'express-ejs-layouts';
import { AuthController } from './src/controllers/auth.controller.js';
import session from 'express-session';
// controller import
import {JobController} from './src/controllers/job.controller.js';

// import middlewares
import Auth from './src/middlewares/auth.middleware.js';
import { uploadFile } from './src/middlewares/fileuploadmiddleware.js';
import MailMiddleware from './src/middlewares/mail.middleware.js';
import { log } from 'console';

// importing logs middleware
import createLogs from './src/middlewares/logs.middleware.js';
import {CloseConn} from './src/config/db.js'
// create server
const server = express();

// initializing controller object

const jobController = new JobController();
const authController = new AuthController();

// setting express session
server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

server.use(bodyParser.json())
// setting ejs as views engine 
server.set('views',path.join(path.resolve(),'src','views'));
server.set('view engine','ejs');

console.log(path.resolve());
server.use(express.static('src/views'));
server.use(express.static('public'));
server.use(express.static(path.join(path.resolve(),'src','public')))

server.use(ejsLayouts);

// form data will encoded in json format by default
server.use(express.urlencoded({extended:true}))


// job routes

server.get('/',createLogs,jobController.getHomePage);  //done
server.get('/jobs',createLogs,jobController.getJobsPage); //done
server.get('/jobs/:id',createLogs,Auth,jobController.getJobsDetailsPage); //done
server.post('/jobs/:id/apply',createLogs,Auth,uploadFile.single("file"),jobController.postJobsApplyPage);

server.get('/view_pdf/:pdf_url',createLogs,Auth,(req,res)=>{
  try{
    console.log(req.params.pdf_url)
    res.sendFile(path.join(path.resolve(),'src','public','resume',req.params.pdf_url));
  } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }
  
})
// job posted routes

server.get('/post_job',createLogs,Auth,jobController.getJobsPostedPage); //done
server.post('/post_job',createLogs,Auth,jobController.postJobsPostedPage); //done
server.get('/post_job_by_id',createLogs,Auth,jobController.getPostedJobByID); //done
server.get('/post_job/delete/:id',createLogs,Auth,jobController.deletePostedJobByID); //done
// server.get('/post_job/update/:id',createLogs,jobController.getupdatePostedJobByID);
server.get('/view-apply-jobs',createLogs,Auth,jobController.getApplyJobsDetails);


// server.get('/jobs/update/:id',createLogs,jobController.getJobsUpdatePage);
// server.post('/jobs/update/:id',createLogs,jobController.postJobsUpdatePage);
// server.delete('/jobs/delete/:id',createLogs,jobController.deleteJobById);


// login page routes
server.get('/login',createLogs,authController.getLoginPage); //done
server.post('/login',createLogs,authController.postLoginPage); //done
server.get('/logout',CloseConn,authController.logoutReguest); //done
server.get('/register',createLogs,authController.getRegisterPage); //done
server.post('/register',createLogs,authController.postRegisterPage,MailMiddleware); //done
server.get('/profile',(req,res)=>{
  res.render('_view_profile')
})
server.use((req, res) => {
  res.render('_404');
});

server.listen(process.env.PORT,()=>{
    console.log("JOB PORTAL START LISTINGING ON PORT ",process.env.PORT);
})