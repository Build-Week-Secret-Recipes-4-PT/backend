const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = require('express').Router();
const { jwtSecret } = require("../../config/secrets");
const Users = require('../users/users-model.js');
const { checkCredentials } = require("./auth2-middleware");

router.post('/register', checkCredentials, (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.add(user)
    .then(() => {
      res.status(201).json({
        message: `Welcome!`
      });
    })
    .catch(next);
});

router.post('/login', checkCredentials, (req, res, next) => {
  let { email, password } = req.body;

  Users.findBy({ email })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({
          message: `Welcome back!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(next);
});

const makeToken = user => {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "5d"
  };
  return jwt.sign(payload, jwtSecret, options );
};

module.exports = router;
