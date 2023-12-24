export class Jobs{
    constructor(job_category,job_designation,job_location,job_company_name,job_salary,job_apply_date,job_skills,job_openings,job_posted,job_posted_by){
        this.job_id=Math.floor(Math.random() * 1000);
        this.job_category=job_category;
        this.job_designation=job_designation;
        this.job_location=job_location;
        this.job_company_name=job_company_name;
        this.job_salary=job_salary;
        this.job_apply_date=job_apply_date;
        this.job_skills=job_skills;
        this.job_openings=job_openings;
        this.job_posted=new Date();
        this.job_posted_by=job_posted_by;
    }

    static addNewJob(job_category,job_designation,job_location,job_company_name,job_salary,job_apply_date,job_skills,job_openings,job_posted,job_posted_by){
        let job_skills_arr = [];
        job_skills_arr.push(job_skills);
        let new_job = new Jobs(job_category,job_designation,job_location,job_company_name,job_salary,job_apply_date,job_skills_arr,job_openings,job_posted,job_posted_by)
         
        jobs_data.push(new_job);

        return Jobs.getJobs();

    }

    static getJobs(){
          return jobs_data;
    }

    static getJobByID(id){
        console.log("STARTING OF getJobByID --");
        console.log(id);
        let job_data = jobs_data.find((job)=>{
          if(job.job_id==id){
            return job;
          }
       })
       console.log(job_data);
       console.log("ENDING OF getJobByID --");
       return job_data
    }

    static getJobByUser(id_arr){
        console.log("STARTING OF getJobByUser --");
        console.log(id_arr);
        let result = jobs_data.filter((data)=>
        {
            let flag  = false;
             id_arr.forEach((id)=>
            {
                // console.log("id->"+id+" job_id "+data.job_id)
                if(id==data.job_id){
                    flag=true;
                }
            })
            return flag;
        })
        
       console.log(result);
       console.log("ENDING OF getJobByUser --");
       return result
    }

    static updateJobById(){

    }

    static deleteJobByID(id){
        console.log(id ," inside deleteJobByID");
        const index = jobs_data.findIndex((obj)=>obj.job_id==id);
        jobs_data.splice(index,1);
    }
}


const jobs_data = [
    {
        job_id:1001,
        job_category:"Tech",
        job_designation:'web-devloper',
        job_location:"Gurgaon HR IND Remote",
        job_company_name:"Microsoft",
        job_salary:"50,000",
        job_apply_date:"09:09:2023 14:11:45",
        job_skills:['web-devloper','backend-devloper','frontend-devloper','database-export'],
        job_openings:5,
        job_posted:"09:09:2023 14:11:45",
        job_posted_by:1001
    },
    {
        job_id:1002,
        job_category:"Tech",
        job_designation:'backend-devloper',
        job_location:"Gurgaon HR IND Remote",
        job_company_name:"Google",
        job_salary:"50,000",
        job_apply_date:"09:09:2023 14:11:45",
        job_skills:['web-devloper','backend-devloper','frontend-devloper','database-export'],
        job_openings:5,
        job_posted:"09:09:2023 14:11:45",
        job_posted_by:1001
    },
    {
        job_id:1003,
        job_category:"Tech",
        job_designation:'frontend-devloper',
        job_location:"Gurgaon HR IND Remote",
        job_company_name:"Netflix",
        job_salary:"50,000",
        job_apply_date:"09:09:2023 14:11:45",
        job_skills:['web-devloper','backend-devloper','frontend-devloper','database-export'],
        job_openings:5,
        job_posted:"09:09:2023 14:11:45",
        job_posted_by:1002
    },
    {
        job_id:1004,
        job_category:"Tech",
        job_designation:'database-export',
        job_location:"Gurgaon HR IND Remote",
        job_company_name:"Facebook",
        job_salary:"50,000",
        job_apply_date:"09:09:2023 14:11:45",
        job_skills:['web-devloper','backend-devloper','frontend-devloper','database-export'],
        job_openings:5,
        job_posted:"09:09:2023 14:11:45",
        job_posted_by:1002
    },{
        job_id:1005,
        job_category:"Tech",
        job_designation:'web-devloper',
        job_location:"Gurgaon HR IND Remote",
        job_company_name:"Meta",
        job_salary:"50,000",
        job_apply_date:"09:09:2023 14:11:45",
        job_skills:['web-devloper','backend-devloper','frontend-devloper','database-export'],
        job_openings:5,
        job_posted:"09:09:2023 14:11:45",
        job_posted_by:1003
    }
]