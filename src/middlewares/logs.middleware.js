import connObj from "../config/db.js";

export default function createLogs(req,res,next){
    let user_id = req.session.user_id;
    let req_url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        
        let query = `insert into logs (req_url,req_user_id) values ('${req_url}','${user_id}')`
        connObj.query(query, function (err, result, fields) {
            if (err) throw err; 
         });

         next();
   
    }
