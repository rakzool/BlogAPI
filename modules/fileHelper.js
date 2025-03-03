const fs = require('fs');


const getBlogsSync = (path) => {
  let data = "";
  try{
      data = fs.readFileSync(path,"utf-8");
  }catch(err){
        console.error(err);
  }

  return JSON.parse(data);
}

const appendBlogs = async(path,body) => {
    const {title,content,writer} = body;
    const blogs = await getBlogsSync(path);
    const newBlog = {
        id: blogs.length ? parseInt(blogs[blogs.length -1].id) +1 : 1,
        title : title,
        content : content,
        writer : writer
    }

    blogs.push(newBlog);

    try{
        fs.writeFileSync(path,JSON.stringify(blogs,null,2),"utf-8");
        return {message :"success in writing file " ,status :201, hasError : false }
    }catch(err){
        console.log(err);
        return {message :"Unable to create Blog " ,status :500, hasError : true, errorMessage : "BLOG-101" }
    }

}

const deleteBlogs = async(id,path) => {
    const blogs = await getBlogsSync(path);
    const newBlog = blogs.filter(blog => blog.id !== id);
    if(blogs.length === newBlog.length){
        return {message :"Blog that you are trying to delete does not exist" ,status :400, hasError : true, errorMessage : "BLOG-103" }
    }else{
        try{
            fs.writeFileSync(path,JSON.stringify(newBlog,null,2),"utf-8");
            return {message :"Blog deleted succesfully" ,status :204, hasError : false }
        }catch(err){
            console.log(err);
            return {message :"unable to delete Blog" ,status :500, hasError : true, errorMessage : "BLOG-104" }
        }
    }

}

const updateIndex = async(id,path,body) => {
  let blogs = await getBlogsSync(path);
  const {title,content,writer} = body;

  const newBlogBody = {
    id : id,
    title :title,
    content:content,
    writer:writer  
  }

  const index = blogs.findIndex(blog => blog.id === id);
  if(index === -1){
    return {message :"Blog that you are trying to edit does not exist" ,status :400, hasError : true, errorMessage : "BLOG-203" }
  }else{
    blogs[index] = {...blogs[index],...newBlogBody}
    try{
        fs.writeFileSync(path,JSON.stringify(blogs,null,2),"utf-8");
        return {message :"Blog edited succesfully" ,status :202, hasError : false }
    }catch(err){
        console.log(err);
        return {message :"unable to update Blog" ,status :500, hasError : true, errorMessage : "BLOG-204" }
    }
  }
}

const messageFormatter = (status,message,hasError,errorCode) => {
    let resMessage = {
       status : status,
       message : message,
    }

    if(hasError){
       resMessage = {
        status : status,
        errorCode : errorCode,
        message : message,
     }
    }
    return resMessage
}


module.exports = {getBlogsSync,messageFormatter,appendBlogs,deleteBlogs,updateIndex};