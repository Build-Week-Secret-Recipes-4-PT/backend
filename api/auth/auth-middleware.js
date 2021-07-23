const User = require("../users/users-model");

const checkPayload = (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(401).json({
            message: "Email and password are required"
        });
    } else {
        next();
    }
};

const checkEmailFree = async (req, res, next) => {
    try{
        const user = await User.findBy({email: req.body.email});
            if(!user.length){
                next();
            }else{
                res.status(401).json({
                    message: "Account using this email already exists."
                });
            }
    }catch(err){
        res.status(500).json({
            message: `${err}`
        });
    }
};

const checkAccountExists = async (req, res, next) => {
    try{
        const user = await User.findBy({email: req.body.email});
            if(user.length){
                req.userData = user[0];
                next();
            }else{
                res.status(401).json({
                    message: "Login error. Check credentials."
                });
            }
    }catch(err){
        res.status(500).json({
            message: `${err}`
        });
    }
};

module.exports = {
    checkPayload,
    checkEmailFree,
    checkAccountExists
};