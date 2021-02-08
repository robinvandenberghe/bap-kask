const jwt = require('jsonwebtoken');

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
        req.authUserId = decoded.id;
        next();
      }
    });
  }
};

const hasRole = (req, res, connection, role, next) => {
  try {
    connection.query('SELECT * FROM `users` WHERE `id` = ?', [ req.authUserId ],  (error, results, fields) => {
      if (error || results.length || results.length === 0) throw error;
      const user = results[0];
      if (role.isArray()) {
        if (role.indexOf(user.role) !== - 1) {
          next();
        } else {
          res.status(403).send({
            success: false,
            message: 'Unauthorized'
          });
        }
      } else {
        if (user.role.includes(role)) {
          next();
        } else {
          res.status(403).send({
            success: false,
            message: 'Unauthorized'
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal error, please try again',
      error
    });
  }
};

module.exports = {checkToken, hasRole};
