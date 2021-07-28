const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");
const Users = require("./users-model");

// FOR SESSIONS

// const restricted = (req, res, next) => {
//     if(req.session.user){
//         next();
//     } else{
//         res.status(401).json({
//             message: "You shall not pass."
//         });
//     }
// };

// FOR JWT TOKEN

// const restricted = (req, res, next) => {
//     const token = req.headers.authorization;

//     if(token){
//         jwt.verify(token, jwtSecret, (err, decoded) => {
//             if(err){
//                 res.status(401).json({
//                     message: "Token is bad " + err.message
//                 });
//             } else{
//                 res.decodedToken = decoded;
//                 next();
//             }
//         });
//     }else {
//         res.status(401).json({
//             message: "You shall not pass."
//         });
//     }
// };

// FOR SESSIONS AND JWT TOKEN

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if(req.session.user){
        next();
    } else if(token){
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err){
                res.status(401).json({
                    message: "Token is bad " + err.message
                });
            } else{
                res.decodedToken = decoded;
                next();
            }
        });
    } else{
        res.status(401).json({
            message: "You shall not pass."
        });
    }
};

const validateUserId = async (req, res, next) => {
    const id = req.params.id;
    const userId = await Users.findById(id);
    if(!userId){
        res.status(404).json({
            message: "User not found."
        });
    } else {
        req.user = userId;
        next();
    }
};

module.exports = {
    restricted,
    validateUserId
};
