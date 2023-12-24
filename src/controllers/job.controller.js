import {Jobs} from '../modals/job.modal.js';
import {Applicant} from '../modals/applicant.modal.js';
import { User } from '../modals/user.modal.js';
import UserRepository from '../repository/user.repository.js';
import connObj from '../config/db.js';
// let userRepository = new UserRepository();

export class JobController{

    postJobsApplyPage(req,res){
      try {     
        console.log("STARTING OF PostJobsApplyPage --");
        const {name,email,contact} = req.body;
        let job_id = req.params.id
        let user_id = req.session.user_id;
        let username = req.session.username;
        let resume_path = req.file.filename;

        let query = `INSERT INTO apply_job_data (job_id, applicant_id, applicant_name, applicant_contact, applicant_email, applicant_resume_path, applicant_image_path) VALUES (${job_id}, ${user_id}, '${name}', '${contact}', '${email}', '${resume_path}', '/public/img/user.jpg')`;

        connObj.query(query, function (err, result, fields) {
         if (err) throw err;
         // console.log(result); 
         // result.forEach(data => {
         //    // console.log(data);
         //    data.skills_required = (data.skills_required).split(',');
         // });        
         // let query = `select * from job_details_data where job_id in ( select job_id from apply_job_data where applicant_id = ${user_id})`;
         let query = `SELECT applicant_name, applicant_contact, applicant_email, applicant_resume_path from apply_job_data where applicant_id = ${user_id}`;

      
         connObj.query(query, function (err, result, fields) {
            if (err) throw err;
            // console.log(result); 
            // result.forEach(data => {
               // console.log(data);
               // data.skills_required = (data.skills_required).split(',');
            // });        
            
           
         //   res.render('view-apply-jobs', {"data_arr":result,username});
         //   console.log("ENDING OF PostJobsApplyPage --");

           res.render('_view_apply', {"data_arr":result,username});
           console.log("ENDING OF PostJobsApplyPage --");

         });
      });
     
         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }

     
    }

    getHomePage(req,res){
      try { 
        console.log("STARTING OF GetHomePage --");
        res.render('home',{username:req.session.username});
        console.log("ENDING OF GetHomePage --");
         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }

     }

     getJobsPage(req,res){
      try {

        console.log("STARTING OF getJobsPage --");
       
        console.log('connected to mysql database');
        let query  = "select * from job_details_data where deleted=0"

        connObj.query(query, function (err, result, fields) {
           if (err) throw err;
           // console.log(result); 
           result.forEach(data => {
              // console.log(data);
              data.skills_required = (data.skills_required).split(',');
           });        
           // console.log("user session -> ",req.session);
         //   res.render('jobs',{"jobs":result,username:req.session.username});
           // console.log("user session -> ",req.session);
           res.render('_view_jobs',{"jobs":result,username:req.session.username});
        });
       
    console.log("ENDING OF getJobsPage --");
         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }

     }

     getJobsDetailsPage(req,res){
      try {
        console.log("STARTING OF getJobsDetailsPage --");

        console.log(req.params);
        let id = req.params.id;
         console.log('connected to mysql database');
         let query  = `select * from job_details_data where job_id='${id} and deleted=0'`;

         connObj.query(query, function (err, result, fields) {
            if (err) throw err;
            // console.log(result); 
            result.forEach(data => {
               // console.log(data);
               data.skills_required = (data.skills_required).split(',');
            });        
            // console.log("user session -> ",req.session);

            // console.log(result);
            res.render('job-details',{"obj_data":result[0],username:req.session.username});         });

        console.log("ENDING OF getJobsDetailsPage --");
         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }
     }

     // job posted page

     getJobsPostedPage(req,res){
      try { 
      console.log("STARTING OF getJobsPostedPage --");
      res.render('_create_job_form',{username:req.session.username});
      // res.render('post-job',{username:req.session.username});
      console.log("ENDING OF getJobsDetailsPage --");
         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }

     }

     postJobsPostedPage(req,res){
      try {

         
      console.log("STARTING OF postJobsPostedPage --");

      let posted_by = req.session.user_id;
      console.log(req.body);
      const {job_title, job_desc, salary, job_openings, skills_required, company_name, company_addr, job_location} = req.body;
         console.log('connected to mysql database');
         let query = `INSERT INTO job_details_data (job_title, job_desc, salary, job_openings, skills_required, company_name, company_addr, job_location, job_posted_by) VALUES ('${job_title}', '${job_desc}', '${salary}', '${job_openings}', '${skills_required}', '${company_name}', '${company_addr}', '${job_location}', '${posted_by}')`;
 
         connObj.query(query, function (err, result, fields) {
             if (err) throw err;
            //  console.log(result);

             if(!result){
               res.render('_create_job_form',{username:req.session.username})
            }
      
           });

         query  = "select * from job_details_data where deleted=0"

         connObj.query(query, function (err, result, fields) {
            if (err) throw err;
            // console.log(result); 
            result.forEach(data => {
               data.skills_required = (data.skills_required).split(',');
            });        
            console.log("user session -> ",req.session);
            res.render('_view_jobs',{"jobs":result,username:req.session.username});
         });
         
         console.log("ENDING OF postJobsPostedPage --");
         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }

     }

     getPostedJobByID(req,res){
      try {

         
      let user_id = req.session.user_id;
      // console.log(id);

            console.log('connected to mysql database');
            let query  = `select * from job_details_data where job_posted_by=${user_id} and deleted=0`;

            connObj.query(query, function (err, result, fields) {
               if (err) throw err;
               // console.log(result); 
               result.forEach(data => {
                  // console.log(data);
                  data.skills_required = (data.skills_required).split(',');
               });        
               
               // console.log(result);

               res.render('view-posted-jobs', {"jobs":result,username:req.session.username});
            });
            
         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }

     }

     deletePostedJobByID(req,res){
      try {

         
        let job_id  = req.params.id;
        let user_id = req.session.user_id;
      
      console.log('connected to mysql database');
      let query  = `update job_details_data set deleted=1 where job_id=${job_id} and job_posted_by=${user_id};
      `;

      connObj.query(query, function (err, result, fields) {
         if (err) throw err;
         // console.log(result); 
         
         query  = `select * from job_details_data where job_posted_by=${user_id} and deleted=0`;

            connObj.query(query, function (err, result, fields) {
               if (err) throw err;
               // console.log(result); 
               result.forEach(data => {
                  data.skills_required = (data.skills_required).split(',');
               });        
               
               res.render('view-posted-jobs', {"jobs":result,username:req.session.username});
            });
      });
      
         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }

   }

   getApplyJobsDetails(req,res){

      try {

         
      let username = req.session.username;
      let user_id = req.session.user_id;

      // let query = `select * from job_details_data where job_id in ( select job_id from apply_job_data where applicant_id = ${user_id})`;

      let query = `SELECT applicant_name, applicant_contact, applicant_email, applicant_resume_path from apply_job_data where applicant_id = ${user_id}`;

      connObj.query(query, function (err, result, fields) {
         if (err) throw err;
         // console.log(result); 
         // result.forEach(data => {
            // console.log(data);
            // data.skills_required = (data.skills_required).split(',');
         // });        
         
        
      res.render('view-apply-jobs', {"data_arr":result,username});
        console.log("ENDING OF postJobsApplyPage --");
      });

         
      } catch (error) {
         console.log(error);
         res.render('_error')
      }
      finally{
            // connObj.end(()=>{
            //   console.log('connection close');
            // });
      }

   }
}

 





 


