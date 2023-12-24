import connObj from "../config/db.js";

export default class AppliedRepository{

    addNewApplicent(job_id, applicant_id, applicant_name, applicant_contact, applicant_email, applicant_resume_path, applicant_image_path, deleted){

      connObj.connect((error)=>{
        if(error){
        console.log(error);
        }else{
        console.log('connected to mysql database');

        let query = `INSERT INTO apply_job_data (job_id, applicant_id, applicant_name, applicant_contact, applicant_email, applicant_resume_path, applicant_image_path) values(${job_id}, ${applicant_id}, ${applicant_name}, ${applicant_contact}, ${applicant_email}, ${applicant_resume_path}, ${applicant_image_path})`;


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
    getAllAppliedJobs(){
        connObj.connect((error)=>{
            if(error){
            console.log(error);
            }else{
            console.log('connected to mysql database');

            let query = `select * from apply_job_data`;


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

    getAppliedJobs(userid){
      connObj.connect((error)=>{
          if(error){
          console.log(error);
          }else{
          console.log('connected to mysql database');

          let query = `SELECT * FROM apply_job_data WHERE applicant_id=${userid}`;

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