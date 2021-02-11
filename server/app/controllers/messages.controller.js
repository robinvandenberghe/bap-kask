const {connection} = require('../middleware/mysqlLib');

exports.create = (req, res) => {
  const {id, sender, recipient, message} = req.body;
  if (!id || !sender || !recipient || !message) {
    return res.status(400).send({
      success: false,
      error: {
        name: `newMessage`,
        id: `MISSING_FIELDS`,
        message: `Some fields are missing, please try again.`
      }
    });
  }
  const messageToInsert = {id, senderId: sender.id, recipientId: recipient.id, message};
  try {
    connection.query('INSERT INTO `messages`SET ?', messageToInsert, error => {
      if (error) throw error;
      try {
        connection.query('SELECT messages.*, s.name AS senderName, s.surname AS senderSurname, s.profileUrl AS senderProfileUrl, r.name AS recipientName, r.surname AS recipientSurname, r.profileUrl AS recipientProfileUrl FROM messages JOIN users AS s ON s.id = messages.senderId JOIN users AS r ON r.id = messages.recipientId WHERE `messages`.id = ?', id, (error, results) => {
          if (error || results.length === 0) throw error;
          return res.send({
            success: true,
            message: results[0]
          });
        });
      } catch (error) {
        return res.status(500).send({
          success: false,
          error: {
            name: `newMessage`,
            id: `INTERNAL_ERROR`,
            message: `Internal error, please try again`
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: {
        name: `newMessage`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.findAll = (req, res) => {
  try {
    connection.query('SELECT messages.*, s.name AS senderName, s.surname AS senderSurname, s.profileUrl AS senderProfileUrl, r.name AS recipientName, r.surname AS recipientSurname, r.profileUrl AS recipientProfileUrl FROM messages JOIN users AS s ON s.id = messages.senderId JOIN users AS r ON r.id = messages.recipientId WHERE `senderId` = ? OR `recipientId` = ? ORDER BY messages.sentAt ASC', [req.authUserId, req.authUserId], (error, results) => {
      if (error) throw error;
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `newMessage`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.findOne = (req, res) => {
  try {
    connection.query('SELECT messages.*, s.name AS senderName, s.surname AS senderSurname, s.profileUrl AS senderProfileUrl, r.name AS recipientName, r.surname AS recipientSurname, r.profileUrl AS recipientProfileUrl FROM messages JOIN users AS s ON s.id = messages.senderId JOIN users AS r ON r.id = messages.recipientId WHERE `messages`.id = ?', req.params.messageId, (error, results) => {
      if (error || results.length === 0) throw error;
      res.send(results[0]);
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `newMessage`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.update = (req, res) => { 
  const {id, sender, recipient, message, sentAt, hasRead} = req.body;
  if (!id || !sender || !recipient || !message || !sentAt || !hasRead) {
    return res.status(400).send({
      success: false,
      error: {
        name: `newMessage`,
        id: `MISSING_FIELDS`,
        message: `Some fields are missing, please try again.`
      }
    });
  }
  try {
    const messageToUpdate = {id, senderId: sender.id, recipientId: recipient.id, message, sentAt: toDbDate(sentAt), hasRead};
    connection.query('UPDATE messages SET = ?', messageToUpdate, (error, results) => {
      if (error || results.length === 0) throw error;
      res.send(results[0]);
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `newMessage`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.delete = (req, res) => {
  const {messageId} = req.params;
  try {
    connection.query('DELETE FROM messages WHERE id = ?', messageId, error => {
      if (error) throw error;
      return res.sendStatus(200);
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `newMessage`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

const toDbDate = date => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};