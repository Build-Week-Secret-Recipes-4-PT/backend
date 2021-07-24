const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");

// const restricted = (req, res, next) => {
//     if(req.session.user){
//         next();
//     } else{
//         res.status(401).json({
//             message: "You shall not pass."
//         });
//     }
// };
//! For Sessions

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
//! For JWT Token

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
//! For sessions and token

module.exports = {
    restricted
};
