const {appendBlogs,messageFormatter} = require("./fileHelper");

const createBlogHandeler = async(req,res,path) => {

   const result = await appendBlogs(path,req.body);
   const {message,status,hasError,errorMessage} = result;
    res.header("Content-Type","application/json");
    res.status(status);
    res.json(messageFormatter(status,message,hasError,errorMessage));
    res.end();
  
}

module.exports = createBlogHandeler