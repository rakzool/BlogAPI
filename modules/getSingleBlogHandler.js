const {getBlogsSync} = require('./fileHelper');

const getSingleBlogHandler = async (req, res , path) => {
    const blogId = req.params.id;
    const blogs = await getBlogsSync(path);
    const blog = blogs.find(blog=>blog.id === blogId);
     if(blog){
          res.status(200);
          res.header("Content-Type","application/json");
          res.send(blog);
     }else{
         res.status(404);
         res.header("Content-Type","application/json");
         res.send({message:`Blog with id ${blogId} not found`});
     } 
}

module.exports = getSingleBlogHandler;