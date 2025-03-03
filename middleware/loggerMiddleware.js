const logger = (req,res,next) => {
     console.log(`[${new Date().toTimeString()}] ${req.method} ${req.url}`);
     const body = JSON.stringify(req.body);
        if(body !== '{}'){
            console.log(`Request body: ${body}`);
        }
      next();
}

module.exports = logger;