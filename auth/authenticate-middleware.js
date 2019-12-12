const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if(err) {

      res.status(401).json({ message: 'Fake dad alert!' });
    }else {

      req.user = {
        username: decodedToken.username,
        department: decodedToken.department,
      };
      next();
    }
  });

  } else {
    res.status(400).json({ message: 'Real dads only.' });
  }
};

