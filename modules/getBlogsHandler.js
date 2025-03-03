const {getBlogsSync} = require('./fileHelper');

const getBlogsHandler = async(req,res,path) => {
   const data = await getBlogsSync(path);

    if(JSON.stringify(data)){
        res.status(200);
        res.header("Content-Type","application/json");
        res.json(data);
        res.end();
    }else{
        res.status(404);
        res.header("Content-Type","text/plain");
        res.send("404 Resource not found");
        res.end();
    }
}

module.exports = getBlogsHandler;