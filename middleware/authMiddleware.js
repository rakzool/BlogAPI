const JWT = require("jsonwebtoken");
const {messageFormatter} = require("../modules/fileHelper");

const clientSecret = process.env.CLIENT_SECRET;

const authMiddleware = (req,res,next) => {
    const jwtToken = req.headers.jwt;
    const {userid,password,iat} = JWT.decode(jwtToken,clientSecret);

    try{
       JWT.verify(jwtToken,clientSecret);
    }catch(error){
        res.status(401);
        res.header("Content-Type", "application/json");
        res.json(messageFormatter(401, "Unauthorised", true, "BLOG-401"));
        res.end();
    }

    if(userid==="john.doe@testmail.com" && password === "John@123"){
        const expiery = new Date(iat * 1000);
        const currentTime = new Date();
        if(expiery > currentTime){
         next();
        }else{
            res.status(401);
            res.header("Content-Type", "application/json");
            res.json(messageFormatter(401, "Expiered JWT", true, "BLOG-402"));
            res.end();
        }
    }else{
        res.status(401);
        res.header("Content-Type", "application/json");
        res.json(messageFormatter(401, "Unauthorised", true, "BLOG-401"));
        res.end();

    }

}

module.exports = authMiddleware;