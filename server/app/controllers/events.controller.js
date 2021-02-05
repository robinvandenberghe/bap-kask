
exports.create = (req, res, connection) => {
  const {id, topic, startDate, endDate, title, content, ticketInfo, address} = req.body;
  if (!id || !title || !content || !topic || !startDate || !endDate || !ticketInfo || !address) {
    return res.status(400).send({err: 'Er ontbreekt een veld of een veld is iet ingevuld'});
  }
  const eventToInsert = {id, topicId: topic.id, title, content, startDate: convertToDb(startDate), endDate: convertToDb(endDate), ticketInfo, address};
  try {
    connection.query('INSERT INTO `events` SET ?', eventToInsert, (error, results, fields) => {
      if (error) throw error;
      try {
        connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id WHERE `events`.id = ?', [ id ], (error, results, fields) => {
          if (error) throw error;
          if (!results.length || results.length === 0) {
            return res.status(404).send('No event found');
          }
          return res.send(results[0]);
        });
      } catch (err) {
        return res.status(500).send({err: err || 'Error'});
      }
    });
  } catch (err) {
    return res.status(500).send({err: err || 'Error'});
  }
};

exports.findAll = (req, res, connection) => {
  try {
    connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id',  (error, results, fields) => {
      if (error || !results.length || results.length === 0) throw error;
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.findOne = (req, res, connection) => {
  try {
    const {eventId} = req.params;
    connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id WHERE `events`.id = ?', [ eventId ], (error, results, fields) => {
      if (error) throw error;
      if (!results.length || results.length === 0) {
        return res.status(404).send('No event found');
      }
      return res.send(results[0]);
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.update = (req, res, connection) => {
  const {id, topic, startDate, endDate, title, content, ticketInfo, address} = req.body;
  if (!id || !title || !content || !topic || !startDate || !endDate || !ticketInfo || !address) {
    return res.status(400).send({err: 'Er ontbreekt een veld of een veld is iet ingevuld'});
  }
  try {
    connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id WHERE `events`.id = ?', [ id ], (error, results, fields) => {
      if (error) throw error;
      if (!results.length || results.length === 0)res.status(404).send('No project found');
      const eventToUpdate = {id, topicId: topic.id, title, content, startDate: convertToDb(startDate), endDate: convertToDb(endDate), ticketInfo, address};
      try {
        connection.query('UPDATE `events` SET ? WHERE id = ?', [ eventToUpdate, id ], (error, results, fields) => {
          if (error) throw error;          
          try {
            connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id WHERE `events`.id = ?', [ id ], (error, results, fields) => {
              if (error) throw error;
              if (!results.length || results.length === 0) {
                return res.status(404).send('No event found');
              }
              return res.send(results[0]);
            });
          } catch (err) {
            return res.status(500).send({err: err.sqlMessage || 'Error'});
          }        });
      } catch (err) {
        return res.status(500).send({err: err.sqlMessage || 'Error'});
      }
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.delete = (req, res, connection) => {
  try {
    const {eventId} = req.params;
    connection.query('DELETE FROM `events` WHERE id = ?', [ eventId ],  (error, results, fields) => {
      if (error) throw error;
      return res.send({success: true});
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

const convertToDb = date => new Date(date).toISOString().slice(0, 19).replace('T', ' ');
