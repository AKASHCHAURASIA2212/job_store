import mysql from 'mysql';

let connObj = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'job_store',
    port:'3307'
})

export function CloseConn(req,res,next){
    try{
        connObj.connect((error)=>{
            if(error){
             console.log(error);
            }else{
                console.log('connected to mysql database');
                let user_id = req.session.user_id;
                let req_url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
                    
                    let query = `insert into logs (req_url,req_user_id) values ('${req_url}','${user_id}')`
                    connObj.query(query, function (err, result, fields) {
                        if (err) throw err; 
    
                            
                        connObj.end(()=>{
                            console.log('connection close');
                        });
                     });
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
     
      next();
}


export default connObj ;