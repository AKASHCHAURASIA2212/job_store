export class Applicant{

    constructor(applicant_id,applicant_name,applicant_email,applicant_contact,applicant_resume_path,job_applied_id){
        this.applicant_id=applicant_id;
        this.applicant_name=applicant_name;
        this.applicant_email=applicant_email;
        this.applicant_contact=applicant_contact;
        this.applicant_resume_path=applicant_resume_path;
        this.job_applied_id = job_applied_id;
    }

    static addApplicant(applicant_id,applicant_name,applicant_email,applicant_contact,applicant_resume_path,job_applied_id){

        let index = applicant_data.findIndex((data)=>{
               return data.applicant_id==applicant_id;
        })

        if(index!==-1){

            let applicant_obj = applicant_data[index];
            applicant_obj.applicant_contact = applicant_contact;
            applicant_obj.applicant_resume_path = applicant_resume_path;
            applicant_obj.job_applied_id = job_applied_id;

        }else{

        let new_applicant = new Applicant(applicant_id,applicant_name,applicant_email,applicant_contact,applicant_resume_path,job_applied_id)
        applicant_data.push(new_applicant);

        }

        return Applicant.getApplicants();
    }

    static getApplicants(){
          return applicant_data;
    }

    static getApplicantByID(id){
        applicant_data.find((obj)=>{
          if(obj.applicant_id==id){
            return obj;
          }
       })
    }

    static getApplicantApplyJobs(id){
       let result =  applicant_data.filter((obj)=>{
          if(obj.applicant_id==id){
            return obj;
          }
       })

       return result;
    }

    static updateApplicantById(){

    }

    static deleteApplicantByID(){

    }
}


const applicant_data = [
    {
        applicant_id:1001,
        applicant_name:"Tester",
        applicant_email:"super@gmail.com",
        applicant_contact:"123",
        applicant_resume_path:"/public/resume",
        job_applied_id:1001
    },
    {
        applicant_id:1002,
        applicant_name:"Tester",
        applicant_email:"super2@gmail.com",
        applicant_contact:"123",
        applicant_resume_path:"/public/resume",
        job_applied_id:1002
    },
    {
        applicant_id:1003,
        applicant_name:"Tester",
        applicant_email:"super3@gmail.com",
        applicant_contact:"123",
        applicant_resume_path:"/public/resume",
        job_applied_id:1003
    },
    {
        applicant_id:1004,
        applicant_name:"Tester",
        applicant_email:"super4@gmail.com",
        applicant_contact:"123",
        applicant_resume_path:"/public/resume",
        job_applied_id:1004
    },
    {
        applicant_id:1005,
        applicant_name:"Tester",
        applicant_email:"super5@gmail.com",
        applicant_contact:"123",
        applicant_resume_path:"/public/resume",
        job_applied_id:1005
    }

   ]