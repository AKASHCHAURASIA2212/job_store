export class User{
    constructor(user_name,user_email,user_password,user_contact,user_role){
        this.user_id = Math.floor(Math.random() * 1000);
        this.user_name = user_name;
        this.user_email=user_email;
        this.user_password = user_password;
        this.user_contact=user_contact;
        this.user_role = user_role;
        this.user_apply_job_id = [];
    }

    static addNewUser(user_name,user_email,user_password,user_contact,user_role){
        console.log("Inside addNewUser Function");

        let new_user  = new User(user_name,user_email,user_password,user_contact,user_role);
        user_data.push(new_user);

        return ({
            success:"true",
            massage:'new user added successfully'
        })
    }

    static getUserDetails(user_email,user_password){
        console.log("Inside Get Register Page Function");

        let user_details = user_data.find((user)=>{
            return user.user_email==user_email && user.user_password==user_password;
        })

        if(!user_details){
            return {
                success:"false",
                massage:'user not found !!!',
                user_data:undefined
            }
        }else{
            return{
                success:"true",
                massage:'user found !!!',
                user_data:user_details
            }
        }
    }

    static varifyUser(email,password){
        console.log("Inside Varify Login Function");
        // console.log(email,password);
        let result = user_data.find((user)=>{
            return (user.user_email==email&&user.user_password==password);
        })

        // console.log(result);

        return result;
    }

    static getJobPostedID(user_name){
        let user_details = user_data.find((user)=>{
            return user.user_name==user_name;
        })

        console.log(user_details);
        return [user_details.user_id];
    }


    static getApplyJobID(user_name){
        let user_details = user_data.find((user)=>{
            return user.user_name==user_name;
        })

        console.log(user_details);
        return user_details.user_apply_job_id;
    }

    static getUserID(user_name){

        let user_details = user_data.find((user)=>{
            return user.user_name==user_name;
        })

        console.log(user_details);
        return user_details.user_id;

    }
}

let user_data = [{
    user_id:1001,
    user_name:"akash chaurasia",
    user_email:"demo@gmail.com",
    user_password:"1234",
    user_contact:"8989989899",
    user_role:"user_level2",
    user_apply_job_id:[1002,1003]
},
{
    user_id:1002,
    user_name:"vijay chaurasia",
    user_email:"demo@gmail.com",
    user_password:"1234",
    user_contact:"8989989899",
    user_role:"user_level2",
    user_apply_job_id:[1002,1003]
},{
    user_id:1003,
    user_name:"allu chaurasia",
    user_email:"demo@gmail.com",
    user_password:"1234",
    user_contact:"8989989899",
    user_role:"user_level2",
    user_apply_job_id:[1002,1003]
},{
    user_id:1004,
    user_name:"naga chaurasia",
    user_email:"demo@gmail.com",
    user_password:"1234",
    user_contact:"8989989899",
    user_role:"user_level2",
    user_apply_job_id:[1002,1003]
}

]