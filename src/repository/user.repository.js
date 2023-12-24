// import connObj from "../config/db.js";
import queryExe from "../config/db.js";
export default class UserRepository{

  async getAllUser(){
        connObj.connect((error)=>{
            if(error){
            console.log(error);
            }else{
            console.log('connected to mysql database');

            connObj.query("select * from user_data", function (err, result, fields) {
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

    async checkUserDetails(email,password){
      connObj.connect((error)=>{
          if(error){
          console.log(error);
          }else{
          console.log('connected to mysql database');

          let query = `SELECT * FROM user_data WHERE email=${email} and password=${password}`;

          connObj.query(query, function (err, result, fields) {
              if (err) throw err;
              console.log(result);
               return {status:200,message:"user found",data:data};
            });
          
            connObj.end(()=>{
              console.log('connection close');
            });
          
          //  return connObj;
          }
      }) 
    }

  async addNewUser(fname,lname,email,phone,password){
     
      //     function addUser(fname,lname,email,phone,password){
         
      //         connObj.connect((error)=>{
      //           if(error){
      //           console.log(error);
      //           }else{
      //           console.log('connected to mysql database');

      //           let query = `INSERT INTO user_data(firstname, lastname, email, phone, password)VALUES ('${fname}','${lname}','${email}','${phone}','${password}')`;
                



      //             // connObj.query(query, function (err, result, fields) {
      //             //   if (err){
      //             //     console.log(err.code);
      //             //     return {status:200,message:"user already exist"};
      //             //   } ;
      //             //   console.log(result);
      //             //   console.log(fields.message);

      //             //   return {status:201,message:"user created",data:result};
      //             // });
                
      //             // connObj.end(()=>{
      //             //   console.log('connection close');
      //             // });
                
      //           //  return connObj;
      //           }
      //       }) 
      //  }

          new Promise((resolve, reject) => {
            console.log('console output inside promise body.');
            console.log()
            let query = `INSERT INTO user_data(firstname, lastname, email, phone, password)VALUES ('${fname}','${lname}','${email}','${phone}','${password}')`;

            let response = queryExe(query);

            resolve(response);
        })
        .then(result => {
            console.log('Time: ' + new Date().toISOString());
            console.log('Promise result: ' + response);
            console.log()
        
            // take some time here again:
            // runAround();
        })
        .catch(err => {
            console.log('Time: ' + new Date().toISOString());
            console.log('Error occurred:');
            console.log(err.code);
            console.log()
        });
        
        
    }

    // deleteUserFromDB(){

    // }

    // updateUserDetailsInDB(){

    // }
    
}