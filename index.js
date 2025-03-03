require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const logger = require('./middleware/loggerMiddleware');
const MissingResource = require('./middleware/MissingResource');
const authMiddleware = require("./middleware/authMiddleware");

const getBlogsHandler = require('./modules/getBlogsHandler');
const getSingleBlogHandler = require('./modules/getSingleBlogHandler');
const {messageFormatter} = require ("./modules/fileHelper");
const createBlogHandeler = require("./modules/createBlogHandeler");
const deletBlogHandeler = require("./modules/deleteBlogHandeler");
const updateBlogHandler = require("./modules/updateBlogHandler");

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(authMiddleware);

const PORT = process.env.PORT || 3000;
const dataPath = path.resolve(__dirname, './Resources/data.json');

app.get("/",(req,res)=>{
  res.status(200);
  res.header("Content-Type","application/json");
  const message = messageFormatter(200,"hello to Blog API",false);
  res.json(message);
  res.end();  
});


app.get("/getBlogs",(req,res)=>getBlogsHandler(req,res,dataPath));
app.get("/getBlogs/:id",(req,res)=>getSingleBlogHandler(req,res,dataPath));
app.post("/createBlog",(req,res) =>createBlogHandeler(req,res,dataPath));
app.delete("/deleteBlog/:id",(req,res) =>deletBlogHandeler(req,res,dataPath));
app.put("/updateBlogs/:id",(req,res) =>updateBlogHandler(req,res,dataPath) )

app.use(MissingResource);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})