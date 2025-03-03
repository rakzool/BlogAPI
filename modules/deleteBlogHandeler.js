const {deleteBlogs,messageFormatter} = require("./fileHelper");

const deletBlogHandeler = async(req,res,path) => {
  const BlogId = parseInt(req.params.id);
  const result = await deleteBlogs(BlogId,path);
  const {message,status,hasError,errorMessage} = result;
  res.status(status);
  res.header("Content-Type","application/json");
  res.json(messageFormatter(status,message,hasError,errorMessage));
  res.end();
}

module.exports = deletBlogHandeler