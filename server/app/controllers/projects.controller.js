const fs = require('fs');
const {v4: uuidv4} = require('uuid');

exports.create = (req, res, connection) => {
  const {id, user, study, subject, title, content, slug} = req.body;
  if (!id || !user || !study || !subject || !title || !content || !slug) {
    return res.status(400).send({err: 'Er ontbreekt een veld of een veld is niet ingevuld'});
  }
  const projectToInsert = {id, userId: user.id, studyId: study.id, subjectId: subject.id, title, slug, content};
  try {
    connection.query('INSERT INTO projects SET ?', projectToInsert, (error, results, fields) => {
      if (error) throw error;
      try {
        connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id WHERE `projects`.id = ?', [ id ], (error, results, fields) => {
          if (error) throw error;
          if (!results.length || results.length === 0) {
            return res.status(404).send('No project found');
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
    connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id',  (error, results, fields) => {
      if (error || !results.length || results.length === 0) throw error;
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.findOne = (req, res, connection) => {
  try {
    const {projectId} = req.params;
    connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id WHERE `projects`.id = ?', [ projectId ], (error, results, fields) => {
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

exports.update = (req, res, connection) => {
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
            connection.query('SELECT `projects`.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, s.title AS studyTitle, sub.title AS subjectTitle FROM projects INNER JOIN users AS u ON projects.userId = u.id INNER JOIN studyFields AS s ON projects.studyId = s.id INNER JOIN subjects AS sub ON projects.subjectId = sub.id WHERE `projects`.id = ?', [ id ], (error, results, fields) => {
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

exports.delete = (req, res, connection) => {
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

exports.uploadFile = async (req, res) => {
  try {
    const {data} = req.body;
    const obj = JSON.parse(data);
    const arr = req.files[0].mimetype.split(`/`);
    const extension = arr[arr.length - 1];
    const filename = `${uuidv4()}.${extension}`;
    if (!fs.existsSync(`${__dirname}/../../public/assets/projects/${obj.id}`))fs.mkdirSync(`${__dirname}/../../public/assets/projects/${obj.id}`);
    if (obj.previous && fs.existsSync(`${__dirname}/../../public${obj.previous}`))fs.unlinkSync(`${__dirname}/../../public${obj.previous}`);
    fs.writeFileSync(`${__dirname}/../../public/assets/projects/${obj.id}/${filename}`, req.files[0].buffer);
    res.send({
      status: true,
      message: `File is uploaded`,
      fileUrl: `/assets/projects/${obj.id}/${filename}`,
    });
  } catch (err) {
    return res.status(500).send({err: err || 'Error'});
  }
};
