const jwt = require('jsonwebtoken');
const {connection} = require('./mysqlLib');
const {ADMIN, STUDENT} = require(`../roles`);

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

const isAdmin = (req, res, next) => {
  try {
    connection.query('SELECT * FROM `users` WHERE `id` = ?', [ req.authUserId ], (error, results, fields) => {
      if (error || results.length === 0) throw error;
      const user = results[0];
      if (user.role === ADMIN) {
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: 'Unauthorized'
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Internal error, please try again',
      error
    });
  }
};

const isStudent = (req, res, next) => {
  try {
    connection.query('SELECT * FROM `users` WHERE `id` = ?', [ req.authUserId ], (error, results, fields) => {
      if (error || results.length === 0) throw error;
      const user = results[0];
      if (user.role === STUDENT) {
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: 'Unauthorized'
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Internal error, please try again',
      error
    });
  }
};

const isAdminOrStudent = (req, res, next) => {
  try {
    connection.query('SELECT * FROM `users` WHERE `id` = ?', [ req.authUserId ], (error, results, fields) => {
      if (error || results.length === 0) throw error;
      const user = results[0];
      if (user.role === ADMIN || user.role === STUDENT) {
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: 'Unauthorized'
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Internal error, please try again',
      error
    });
  }
};





module.exports = {checkToken, isAdmin, isStudent, isAdminOrStudent};
