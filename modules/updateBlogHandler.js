const {messageFormatter,updateIndex} = require("./fileHelper");

const updateBlogHandler = async(req,res,path) => {
 const blogID = parseInt(req.params.id);
 const result = await updateIndex(blogID,path,req.body);
 const {message,status,hasError,errorMessage} = result;
 res.status(status);
 res.header("Content-Type","application/json");
 res.json(messageFormatter(status,message,hasError,errorMessage));
 res.end();
}

module.exports = updateBlogHandler