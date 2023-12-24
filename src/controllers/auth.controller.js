import {User} from '../modals/user.modal.js'
// import {Applicant} from '../modals/applicant.modal.js';
import UserRepository from '../repository/user.repository.js';
import connObj from '../config/db.js';
let userRepository = new UserRepository();
export class AuthController{
    getLoginPage(req,res){
        try{
            res.render('_login');
        }
        catch (error) {
            console.log(error);
            res.render('_error')
         }
         finally{
            //    connObj.end(()=>{
            //      console.log('connection close');
            //    });
         }
        
    }

    postLoginPage(req,res){

        try{
            
        console.log("Inside Post Login Page");

        const {password,email}  = req.body;

                    console.log('connected to mysql database');
                    let query = `SELECT * FROM user_data WHERE email='${email}' and password='${password}' and deleted=0`;

                    connObj.query(query,(err,result,feild)=>{
                        if(err){
                            console.log(err);
                            // console.log(err.code);
                            if(err.code==="ER_DUP_ENTRY"){
                                return res.render('register',{status:200,message:"user already exist"})
                                // return ;
                            }
                            return {status:200,message:"something went wrong"};
                        }            
                        // console.log(result);

                        if(result.length!=1){
                            res.render('register',{massage:"User Not Exist"});
                        }else{
                            req.session.username = result[0].firstname;
                            req.session.userrole = result[0].role;
                            req.session.user_id = result[0].id;
                
                            console.log("User Session Created ",req.session);
                            res.render('home',{username:req.session.username,role:req.session.userrole,user_id:req.session.user_id})
                        }
                      
                });
                
            // connObj.end(()=>{
            //     console.log('connection close');
            // });
               
        console.log("ENDING OF Registeration Page");
        }
        catch (error) {
            console.log(error);
            res.render('_error')
         }
         finally{
            //    connObj.end(()=>{
            //      console.log('connection close');
            //    });
         }
     
        
    }

    getRegisterPage(req,res){
        try{
            res.render('_register');
        }
        catch (error) {
            console.log(error);
            res.render('_error')
         }
         finally{
            //    connObj.end(()=>{
            //      console.log('connection close');
            //    });
         }
    //    res.render('_register')
    }

    async postRegisterPage(req,res,next){
        try{
            console.log("STARTING OF Registeration Page");
            const {fname,lname,email,phone,password}  = req.body;
    
                        console.log('connected to mysql database');
                        let query = `INSERT INTO user_data(firstname, lastname, email, phone, password)VALUES ('${fname}','${lname}','${email}','${phone}','${password}')`;
                        connObj.query(query,(err,result,feild)=>{
                            if(err){
                                console.log(err);
                                if(err.code==="ER_DUP_ENTRY"){
                                    return res.render('_register',{status:200,message:"user already exist"})
                                    // return ;
                                }
                                return {status:200,message:"something went wrong"};
                            }            
                            // console.log(result);
                            // console.log(fields.message);
                            // next();
    
                            // return {status:201,message:"user created",data:result};
                            return res.render('_login',{status:201,message:"user created",data:result})
                    });
                    
                
                // connObj.end(()=>{
                //     console.log('connection close');
                // });
                   
            console.log("ENDING OF Registeration Page");
    
        }
        catch (error) {
            console.log(error);
            res.render('_error')
         }
         finally{
            //    connObj.end(()=>{
            //      console.log('connection close');
            //    });
         }
     }

     logoutReguest(req,res){
 
        try{
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                    throw err
                  }else{
                    res.redirect('/_login')
                  }
            })
        }
        catch (error) {
            console.log(error);
            res.render('_error')
         }
         finally{
            //    connObj.end(()=>{
            //      console.log('connection close');
            //    });
         }
     }
}