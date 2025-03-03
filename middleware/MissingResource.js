const {messageFormatter} = require("../modules/fileHelper");

const MissingResource = (req, res, next) => {
    res.status(404);
    res.header("Content-Type", "application/json");
    res.json(messageFormatter(400, "404 resource not found", true, "BLOG-404"));
    res.end();
};

module.exports = MissingResource;  