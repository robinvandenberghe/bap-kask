const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const {connection} = require('../middleware/mysqlLib');

exports.create = (req, res) => {
  const {id, user, study, subject, title, slug} = req.body;
  if (!id || !user || !study || !subject || !title || !slug) {
    return res.status(400).send({
      success: false,
      error: {
        name: `title`,
        id: `MISSING_FIELDS`,
        message: `Some fields are missing, please try again.`
      }
    });
  }
  const projectToInsert = {id, userId: user.id, studyId: study.id, subjectId: subject.id, title, slug};
  try {
    connection.query('INSERT INTO projects SET ?', projectToInsert, (error, results, fields) => {
      if (error) throw error;
      try {
        connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, u.email AS userEmail, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id WHERE `projects`.id = ?', [ id ], (error, results, fields) => {
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
            project: results[0]
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
    connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, u.email AS userEmail, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id',  (error, results, fields) => {
      if (error || !results.length || results.length === 0) throw error;
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.findAllSubjects = (req, res) => {
  try {
    connection.query('SELECT * FROM subjects ORDER BY title ASC',  (error, results, fields) => {
      if (error || !results.length || results.length === 0) throw error;
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.findAllStudies = (req, res) => {
  try {
    connection.query('SELECT * FROM studyFields ORDER BY title ASC',  (error, results, fields) => {
      if (error || !results.length || results.length === 0) throw error;
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.findOne = (req, res) => {
  try {
    const {projectId} = req.params;
    connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, u.email AS userEmail, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id WHERE `projects`.id = ?', [ projectId ], (error, results, fields) => {
      if (error) throw error;
      if (!results.length || results.length === 0) {
        return res.status(404).send('No project found');
      }
      return res.send(results[0]);
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.update = (req, res) => {
  const {id, user, study, subject, title, content, slug} = req.body;
  if (!id || !user || !study || !subject || !title || !content || !slug) {
    return res.status(400).send({err: 'Er ontbreekt een veld of een veld is niet ingevuld'});
  }
  try {
    connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id WHERE `projects`.id = ?', [ id ], (error, results, fields) => {
      if (error) throw error;
      if (!results.length || results.length === 0)res.status(404).send('No project found');
      const projectToUpdate = {id, userId: user.id, studyId: study.id, subjectId: subject.id, title, slug, content};
      try {
        connection.query('UPDATE `projects` SET ? WHERE id = ?', [ projectToUpdate, id ], (error, results, fields) => {
          if (error) throw error;          
          try {
            connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, u.email AS userEmail, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id WHERE `projects`.id = ?', [ id ], (error, results, fields) => {
              if (error) throw error;
              if (!results.length || results.length === 0) {
                return res.status(404).send('No project found');
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

exports.delete = (req, res) => {
  try {
    const {projectId} = req.params;
    connection.query('DELETE FROM `projects` WHERE id = ?', [ projectId ],  (error, results, fields) => {
      if (error) throw error;
      return res.send({success: true});
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.uploadFile = (req, res) => {
  try {
    const {data} = req.body;
    const {previous, id, type} = JSON.parse(data);
    const arr = req.files[0].mimetype.split(`/`);
    const extension = arr[arr.length - 1];
    const filename = `${uuidv4()}.${extension}`;
    if (!fs.existsSync(`${__dirname}/../../public/assets/${type}s/${id}`))fs.mkdirSync(`${__dirname}/../../public/assets/${type}s/${id}`);
    if (previous && previous !== `/assets/img/defaultImg.jpg` && fs.existsSync(`${__dirname}/../../public${previous}`))fs.unlinkSync(`${__dirname}/../../public${previous}`);
    fs.writeFileSync(`${__dirname}/../../public/assets/${type}s/${id}/${filename}`, req.files[0].buffer);
    return res.send({
      status: true,
      message: `File is uploaded`,
      fileUrl: `/assets/${type}s/${id}/${filename}`,
    });
  } catch (err) {
    return res.status(500).send({err: err || 'Error'});
  }
};
