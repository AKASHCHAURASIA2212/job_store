export default function Auth(req,res,next){
      if(req.session.username){
        next();
      }else{
        res.render('login');
      }
}