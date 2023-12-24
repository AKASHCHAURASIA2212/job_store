import multer from "multer";
import path from 'path';
   
console.log("STARTING OF storage")
const storage = multer.diskStorage(
    {

        destination: function (req, file, cb) {
            console.log("inside set destination upload file");
            console.log(req.body);
            console.log(file);
            let file_path = path.join(path.resolve(),'src','public','resume');
            console.log(file_path);
          cb(null,file_path)
        },
        filename: function (req, file, cb) {
            console.log("inside set filename upload file");
        
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null,'_'+ Date.now()+ '.' +extension);
        }
    })

      
    console.log("ENDING OF storage")
      
export const uploadFile = multer({ storage: storage })

