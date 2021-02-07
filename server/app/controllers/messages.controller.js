
exports.create = (req, res, connection) => {
  const {id, sender, recipient, message, sentAt, hasRead} = req.body;
  if (!id || !sender || !recipient || !message || !sentAt || !hasRead) {
    return res.status(400).send({err: 'Er ontbreekt een veld of een veld is iet ingevuld'});
  }
  const messageToInsert = {id, senderId: sender.id, recipientId: recipient.id, message, sentAt, hasRead};
  try {
    connection.query('INSERT INTO `messages`SET ?', messageToInsert, (error, result, fields) => {
      if (error) throw error;
      const message = result.length && result.length === 0 ? undefined : result[0];
      if (message) {
        res.sendStatus(200);
      } else {
        res
          .status(500)
          .send({message: 'Internal error, please try again', error});
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({message: 'Internal error, please try again', error});
  }
};

exports.findAll = async (req, res, connection) => {
  try {
    connection.query('SELECT messages.*, s.name AS senderName, s.surname AS senderSurname, s.profileUrl AS senderProfileUrl, r.name AS recipientName, r.surname AS recipientSurname, r.profileUrl AS recipientProfileUrl FROM messages JOIN users AS s ON s.id = messages.senderId JOIN users AS r ON r.id = messages.recipientId WHERE `senderId` = ? OR `recipientId` = ?', [req.authUserId, req.authUserId], (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  } catch (err) {
    res.status(500).send({err: err.project || 'Error'});
  }
};

exports.findOne = async (req, res, connection) => {
  try {
    connection.query('SELECT messages.*, s.name AS senderName, s.surname AS senderSurname, s.profileUrl AS senderProfileUrl, r.name AS recipientName, r.surname AS recipientSurname, r.profileUrl AS recipientProfileUrl FROM messages JOIN users AS s ON s.id = messages.senderId JOIN users AS r ON r.id = messages.recipientId WHERE `id` = ?', req.params.messageId, (error, results, fields) => {
      if (error || results.length || results.length == 0) throw error;
      res.send(results[0]);
    });
  } catch (err) {
    res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.update = async (req, res, connection) => { 
  const {id, sender, recipient, message, sentAt, hasRead} = req.body;
  if (!id || !sender || !recipient || !message || !sentAt || !hasRead) {
    return res.status(400).send({err: 'Er ontbreekt een veld of een veld is iet ingevuld'});
  }
  try {
    const messageToUpdate = {id, senderId: sender.id, recipientId: recipient.id, message, sentAt, hasRead};
    connection.query('UPDATE messages SET = ?', messageToUpdate, (error, results, fields) => {
      if (error || results.length || results.length === 0) throw error;
      res.send(results[0]);
    });
  } catch (err) {
    res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.delete = async (req, res, connection) => {
  const {messageId} = req.params;
  try {
    connection.query('DELETE FROM messages WHERE id = ?', messageId, (error, results, fields) => {
      if (error || results.length || results.length == 0) throw error;
      res.sendStatus(200);
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};
