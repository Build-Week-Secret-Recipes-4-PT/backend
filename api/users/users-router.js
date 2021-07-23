const router = require("express").Router();
const Users = require("./users-model");
const { restricted } = require("./users-middleware");

router.get("/", restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;