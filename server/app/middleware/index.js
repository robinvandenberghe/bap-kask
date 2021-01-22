const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const checkToken = (req, res, next) => {
  const {token, signature} = req.cookies;

  if (!token) {
    res.status(401).send({
      success: false,
      message: 'Auth token is not supplied'
    });
  } else {
    jwt.verify(`${token}.${signature}`, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.authUserId = decoded._id;
        next();
      }
    });
  }
};

const hasRole = role => async (req, res, next) => {
  const user = await User.findById(req.authUserId);
  if (user.roles.includes(role)) {
    next();
  } else {
    res.status(403).send({
      success: false,
      message: 'Unauthorized'
    });
  }
};

module.exports = {checkToken, hasRole};
