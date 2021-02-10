const {connection} = require('../middleware/mysqlLib');

exports.create = (req, res) => {
  const {id, topic, startDate, endDate, title, ticketInfo, address, subline} = req.body;
  if (!id || !title || !topic || !startDate || !endDate || !ticketInfo || !address) {
    return res.status(400).send({
      success: false,
      error: {
        name: `title`,
        id: `MISSING_FIELDS`,
        message: `Some fields are missing, please try again.`
      }
    });
  }
  const eventToInsert = {id, topicId: topic.id, title, startDate: toDbDate(startDate), endDate: toDbDate(endDate), ticketInfo, address, subline};
  try {
    connection.query('INSERT INTO `events` SET ?', eventToInsert, error => {
      if (error) throw error;
      try {
        connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id WHERE `events`.id = ?', [ id ], (error, results) => {
          if (error) throw error;
          if (!results.length || results.length === 0) {
            return res.status(404).send({
              success: false,
              error: {
                name: `title`,
                id: `INTERNAL_ERROR`,
                message: `Internal error, please try again`
              }
            });
          }
          return res.send({
            success: true,
            event: results[0]
          });
        });
      } catch (err) {
        return res.status(500).send({
          success: false,
          error: {
            name: `title`,
            id: `INTERNAL_ERROR`,
            message: `Internal error, please try again`
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `title`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.findAll = (req, res) => {
  try {
    connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id ORDER BY startDate ASC',  (error, results) => {
      if (error || !results.length || results.length === 0) throw error;
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `title`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.findAllTopics = (req, res) => {
  try {
    connection.query('SELECT * FROM topics ORDER BY title ASC',  (error, results) => {
      if (error || !results.length || results.length === 0) throw error;
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `title`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.findOne = (req, res) => {
  try {
    const {eventId} = req.params;
    connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id WHERE `events`.id = ?', [ eventId ], (error, results) => {
      if (error) throw error;
      if (!results.length || results.length === 0) {
        return res.status(404).send('No event found');
      }
      return res.send(results[0]);
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `title`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.update = (req, res) => {
  const {id, topic, startDate, endDate, title, content, ticketInfo, address} = req.body;
  if (!id || !title || !content || !topic || !startDate || !endDate || !ticketInfo || !address) {
    return res.status(400).send({err: 'Er ontbreekt een veld of een veld is iet ingevuld'});
  }
  try {
    connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id WHERE `events`.id = ?', [ id ], (error, results) => {
      if (error) throw error;
      if (!results.length || results.length === 0)res.status(404).send('No project found');
      const eventToUpdate = {id, topicId: topic.id, title, content, startDate: toDbDate(startDate), endDate: toDbDate(endDate), ticketInfo, address};
      try {
        connection.query('UPDATE `events` SET ? WHERE id = ?', [ eventToUpdate, id ], error => {
          if (error) throw error;          
          try {
            connection.query('SELECT `events`.*, t.title AS topicTitle, t.labelColor FROM `events` INNER JOIN topics AS t ON `events`.topicId = t.id WHERE `events`.id = ?', [ id ], (error, results) => {
              if (error) throw error;
              if (!results.length || results.length === 0) {
                return res.status(404).send('No event found');
              }
              return res.send({
                success: true,
                event: results[0]
              });
            });
          } catch (err) {
            return res.status(500).send({
              success: false,
              error: {
                name: `title`,
                id: `INTERNAL_ERROR`,
                message: `Internal error, please try again`
              }
            });
          }        });
      } catch (err) {
        return res.status(500).send({
          success: false,
          error: {
            name: `title`,
            id: `INTERNAL_ERROR`,
            message: `Internal error, please try again`
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `title`,
        id: `INTERNAL_ERROR`,
        message: `Internal error, please try again`
      }
    });
  }
};

exports.delete = (req, res) => {
  try {
    const {eventId} = req.params;
    connection.query('DELETE FROM `events` WHERE id = ?', [ eventId ], error => {
      if (error) throw error;
      return res.send({success: true});
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        name: `title`,
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