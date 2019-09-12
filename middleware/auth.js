const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  // check whether it is token or not
  if (!token) {
    res.status(401).json({ msg: 'Authorisation denied, no token' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Authorisation denied, token is invalid' });
  }
};
