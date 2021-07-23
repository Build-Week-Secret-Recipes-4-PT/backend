const restricted = (req, res, next) => {
    if(req.session.user){
        next();
    } else{
        res.status(401).json({
            message: "You shall not pass."
        });
    }
};

module.exports = {
    restricted
};
