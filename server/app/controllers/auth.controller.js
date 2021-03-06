const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {connection} = require('../middleware/mysqlLib');

const tokenCookie = {
  maxAge: 18000000,
  sameSite: true
};
const signatureCookie = {
  maxAge: 86400000,
  httpOnly: true,
  sameSite: true
};

exports.login = (req, res) => {
  const {email, password} = req.body;
  if (!email) {
    return res.status(400).send({
      success: false,
      error: {
        name: `email`,
        id: `NO_EMAIL`,
        message: `E-mailadres is vereist.`
      }
    });
  }
  if (!password) {
    return res.status(400).send({
      success: false,
      error: {
        name: `password`,
        id: `NO_PASSWORD`,
        message: `Wachtwoord is vereist.`
      }
    });
  }
  try {
    connection.query('SELECT * FROM `users` WHERE `email` = ?', [email], async (err, result, fields) => {
      if (err) throw err;
      const user = result.length && result.length === 0 ? undefined : result[0];
      if (!user) {
        res.status(401).send({
          success: false,
          error: {
            name: `email`,
            id: `NO_USER`,
            message: `Er bestaat geen gebruiker met dit e-mailadres.`
          }
        });
      } else {
        const isPasswordCorrect = await validPassword(password, user.password);
        if (isPasswordCorrect) {
          const {id, name, surname, role, email} = user;
          const token = jwt.sign({id, name, surname, role, email}, process.env.SECRET, {
            expiresIn: '24h'
          });
          const parts = token.split('.');
          const signature = parts.splice(2);
          res
            .cookie('token', parts.join('.'), tokenCookie)
            .cookie('signature', signature, signatureCookie)
            .sendStatus(200);
        } else {
          res.status(401).send({
            success: false,
            error: {
              name: `email`,
              id: `WRONG_CREDENTIALS`,
              message: `Foutief e-mailadres of wachtwoord.`
            }
          });
        }
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: 'Internal error, please try again',
        error
      });
  }
};

exports.saveWork = (req, res) => {
  const {userId, workId} = req.body;
  if (!userId || !workId) {
    res
      .status(400)
      .send({
        success: false,
        error: {
          id: `NO_DATA`,
          message: `Er werd niet genoeg data aangeleverd.`
        }
      });
  }
  try {
    connection.query('SELECT * FROM `savedProjects` WHERE `userId` = ? AND `projectId` = ?', [ userId, workId ], async (err, result, fields) => {
      if (err) throw err;
      if (result.length === 0) {
        try {
          connection.query('INSERT INTO `savedProjects` SET ?', {userId, projectId: workId}, (err, result, fields) => {
            if (err) throw err;
            res
              .status(200)
              .send({
                success: true,
              });
          });
        } catch (error) {
          res
            .status(500)
            .send({
              success: false,
              message: 'Internal error, please try again',
              error
            });
        }
      } else {
        try {
          connection.query('DELETE FROM `savedProjects` WHERE `userId` = ? AND `projectId` = ?', [ userId, workId ], err => {
            if (err) throw err;
            res
              .status(200)
              .send({
                success: true,
              });
          });
        } catch (error) {
          res
            .status(500)
            .send({
              success: false,
              message: 'Internal error, please try again',
              error
            });
        }
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: 'Internal error, please try again',
        error
      });
  }
};


exports.getAllSavedWorks = (req, res) => {
  try {
    connection.query('SELECT * FROM `savedProjects` WHERE `userId` = ?', [req.authUserId], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: 'Internal error, please try again',
        error
      });
  }
};

exports.getUser = (req, res) => {
  try {
    const {userId} = req.params;
    connection.query('SELECT name, surname, email, role, profileUrl FROM users WHERE id = ?', [ userId ], (error, results) => {
      if (error) throw error;
      if (!results.length || results.length === 0) {
        return res.status(404).send('No user found');
      }
      const {name, surname, email, role, profileUrl} = results[0];
      connection.query('SELECT projectId FROM `savedProjects` WHERE `userId` = ?', [userId], (err, result) => {
        if (err) throw err;
        return res.send({name, surname, email, role, profileUrl, savedWorks: result});
      });
    });
  } catch (err) {
    return res.status(500).send({err: err || 'Error'});
  }
};

exports.logout = (req, res) => {
  res
    .clearCookie('token', tokenCookie)
    .clearCookie('signature', signatureCookie)
    .sendStatus(200);
};

exports.register =  async (req, res) => {
  const {id, email, password, name, surname, role} = req.body;
  try {
    connection.query('SELECT * FROM `users` WHERE `email` = ?', [email], async (err, result) => {
      if (err) throw err;
      if (result[0]) {
        return res.status(401).send({
          success: false,
          error: {
            name: `email`,
            id: `USER_ALREADY_EXISTS`,
            message: `Er bestaat al een gebruiker met dit e-mailadres.`
          }
        });
      } else {
        const hashedPass = await hashPassword(password);
        if (!hashedPass) {
          return res.status(500).send({
            success: false,
            message: 'Internal error, please try again'
          });
        }
        const userToInsert = {id, name, surname, email, password: hashedPass, role};
        try {
          connection.query('INSERT INTO `users`SET ?', userToInsert, error => {
            if (error) throw error;
            connection.query('SELECT * FROM `users` WHERE `id` = ?', [ id ], (err, result) => {
              if (err) throw err;
              const user = result.length && result.length === 0 ? undefined : result[0];
              if (!user) {
                return res.status(401).send({
                  success: false,
                  error: {
                    name: `email`,
                    id: `NO_USER`,
                    message: `Er bestaat geen gebruiker met deze id.`
                  }
                });
              } else {
                const {id, name, surname, role} = user;
                const token = jwt.sign({id, name, surname, role}, process.env.SECRET, {
                  expiresIn: '24h'
                });
                const parts = token.split('.');
                const signature = parts.splice(2);
                return res
                  .cookie('token', parts.join('.'), tokenCookie)
                  .cookie('signature', signature, signatureCookie)
                  .sendStatus(200);
              }
            });
          });
        } catch (error) {
          return res
            .status(500)
            .send({
              success: false,
              error: {
                name: `name`,
                id: `INTERNAL_ERROR`,
                message: `Internal error, please try again`
              }
            });
        }
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: {
        name: `name`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.createStudent =  async (req, res) => {
  const {id, email, name, surname, role} = req.body;
  try {
    connection.query('SELECT * FROM `users` WHERE `email` = ?', [email], async (err, result) => {
      if (err) throw err;
      if (result[0]) {
        return res.status(401).send({
          success: false,
          error: {
            name: `email`,
            id: `USER_ALREADY_EXISTS`,
            message: `Er bestaat al een gebruiker met dit e-mailadres.`
          }
        });
      } else {
        const hashedPass = await hashPassword(id);
        if (!hashedPass) {
          return res.status(500).send({
            success: false,
            message: 'Internal error, please try again'
          });
        }
        const userToInsert = {id, name, surname, email, password: hashedPass, role};
        try {
          connection.query('INSERT INTO `users`SET ?', userToInsert, error => {
            if (error) throw error;
            connection.query('SELECT * FROM `users` WHERE `id` = ?', [ id ], (err, result) => {
              if (err) throw err;
              if (!result[0]) {
                return res.status(401).send({
                  success: false,
                  error: {
                    name: `email`,
                    id: `NO_USER`,
                    message: `Er bestaat geen gebruiker met deze id.`
                  }
                });
              } else {
                const {id, name, surname, role} = result[0];
                return res.send({
                  success: true,
                  user: {id, name, surname, role}
                });
              }
            });
          });
        } catch (error) {
          return res
            .status(500)
            .send({
              success: false,
              error: {
                name: `email`,
                id: `INTERNAL_ERROR`,
                message: `Internal error, please try again`
              }
            });
        }
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: {
        name: `email`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

const hashPassword = async password => await bcrypt.hash(password, 12);
const validPassword = (password, dbPass) => bcrypt.compare(password, dbPass);
