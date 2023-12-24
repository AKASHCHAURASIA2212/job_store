import connObj from "../config/db.js";

export default class JobRepository{

    addNewJob(job_title, job_desc, salary, job_openings, status, skills_required, company_name, company_addr, job_location, job_posted_by){

      connObj.connect((error)=>{
        if(error){
        console.log(error);
        }else{
        console.log('connected to mysql database');

        let query = `INSERT INTO job_details_data (job_title, job_desc, salary, job_openings, status, skills_required, company_name, company_addr, job_location, job_posted_by) VALUES (${job_title}, ${job_desc}, ${salary}, ${job_openings}, ${status}, ${skills_required}, ${company_name}, ${company_addr}, ${job_location}, ${job_posted_by})`;

        connObj.query(query, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
          });
        
          connObj.end(()=>{
            console.log('connection close');
          });
        
        //  return connObj;
        }
    }) 
    }

    getAllJobsFromDB(){
        connObj.connect((error)=>{
            if(error){
            console.log(error);
            }else{
            console.log('connected to mysql database');

            connObj.query("select * from jobs_details_data", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
              });
            
              connObj.end(()=>{
                console.log('connection close');
              });
            
            //  return connObj;
            }
        }) 
    }

    getPostedJobs(userid){
      connObj.connect((error)=>{
          if(error){
          console.log(error);
          }else{
          console.log('connected to mysql database');

          let query = `SELECT * FROM jobs_details_data WHERE job_posted_by=${userid}`;

          connObj.query(query, function (err, result, fields) {
              if (err) throw err;
              console.log(result);
            });
          
            connObj.end(()=>{
              console.log('connection close');
            });
          
          //  return connObj;
          }
      }) 
    }
}