const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const tokenCookie = {
  maxAge: 1800000,
  sameSite: true
};
const signatureCookie = {
  maxAge: 86400000,
  httpOnly: true,
  sameSite: true
};

exports.login = async (req, res, connection) => {
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
          const {id, name, surname, role} = user;
          const token = jwt.sign({id, name, surname, role}, process.env.SECRET, {
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

exports.saveWork = async (req, res, connection) => {
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
          connection.query('INSERT INTO `savedProjects` SET ?', {userId, projectId: workId}, async (err, result, fields) => {
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
          connection.query('DELETE FROM `savedProjects` WHERE `userId` = ? AND `projectId` = ?', [ userId, workId ], async (err, result, fields) => {
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


exports.getAllSavedWorks = async (req, res, connection) => {
  try {
    connection.query('SELECT * FROM `savedProjects` WHERE `userId` = ?', [req.authUserId], async (err, result, fields) => {
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

exports.logout = (req, res) => {
  res
    .clearCookie('token', tokenCookie)
    .clearCookie('signature', signatureCookie)
    .sendStatus(200);
};

exports.register = async (req, res, connection) => {
  const {id, email, password, name, surname, role} = req.body;
  try {
    connection.query('SELECT * FROM `users` WHERE `email` = ?', [email], async (err, result, fields) => {
      if (err) throw err;
      const user = result.length && result.length === 0 ? undefined : result[0];
      if (user) {
        res.status(401).send({
          success: false,
          error: {
            name: `email`,
            id: `USER_ALREADY_EXISTS`,
            message: `Er bestaat al een gebruiker met dit e-mailadres.`
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal error, please try again',
      error
    });
  }
  const hashedPass = await hashPassword(password);
  if (!hashedPass)res.status(500).send({
    success: false,
    message: 'Internal error, please try again'
  });
  const userToInsert = {id, name, surname, email, password: hashedPass, role};
  try {
    connection.query('INSERT INTO `users`SET ?', userToInsert,  (error, result, fields) => {
      if (error) throw error;
      connection.query('SELECT * FROM `users` WHERE `id` = ?', [ id ], async (err, result, fields) => {
        if (err) throw err;
        const user = result.length && result.length === 0 ? undefined : result[0];
        if (!user) {
          res.status(401).send({
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
          res
            .cookie('token', parts.join('.'), tokenCookie)
            .cookie('signature', signature, signatureCookie)
            .sendStatus(200);
        }
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
};

const hashPassword = async password => await bcrypt.hash(password, 12);
const validPassword = (password, dbPass) => bcrypt.compare(password, dbPass);
