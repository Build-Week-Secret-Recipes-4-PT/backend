const checkCredentials = (req, res, next) => {
    const { email, password } = req.body;
    const valid = Boolean(email && password && typeof password === "string");

  if (valid) {
    next();
  } else {
    res.status(422).json({
      message: 'Please provide email and password.',
    });
  }
};

module.exports = {
    checkCredentials
};