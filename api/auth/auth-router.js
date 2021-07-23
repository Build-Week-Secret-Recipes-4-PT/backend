const router = require("express").Router();
const User = require("../users/users-model");
const { checkPayload, checkEmailFree, checkAccountExists } = require("./auth-middleware");
const bcrypt = require("bcryptjs");

router.post("/register", checkPayload, checkEmailFree, async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const hash = bcrypt.hashSync(password, 8);
        const newUser = await User.add({email, password: hash});
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

router.post("/login", checkPayload, checkAccountExists, (req, res) => {
    const { password } = req.body;
    
    try{
        const verified = bcrypt.compareSync(password, req.userData.password);
        if(verified){
            req.session.user = req.userData;
            res.json({
                message: `Welcome back!`
            });
        } else{
            res.status(401).json({
                message: "Invalid credentials."
            });
        }
    } catch(err){
        res.status(500).json({ message: err.message});
    }


});

router.get("/logout", (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.json("Can't log out.");
            }else{
                res.json("Logged out.");
            }
        });
    } else{
        res.json("No sessions");
    }
});

module.exports = router;