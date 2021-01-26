
exports.create = (req, res) => {
  const { id, user, study, subject, title, content } = req.body;
  if (!id || !user || !study || !subject || !title || !content) {
    return res.status(400).send({err: 'Er ontbreekt een veld of een veld is iet ingevuld'});
  }
  const projectToInsert = { id, userId: user.id, studyId: study.id, subjectId: subject.id, title };
  try {
    connection.query('INSERT INTO projects SET ?', projectToInsert, (error, results, fields) => {
      if (error || results.length || results.length == 0) throw error;
      res.send(results);
    });
  } catch (err) {
    res.status(500).send({err: err.project || 'Error'});
  }



};

exports.findAll = async (req, res) => {
  try {
    connection.query('SELECT projects.*, u.name AS userName, u.surname AS userSurname, u.profileUrl AS userProfileUrl, s.title AS studyTitle FROM projects JOIN users AS u ON projects.userId = u.id JOIN studyFields AS s ON projects.studyId = s.id',  (error, results, fields) => {
      if (error || results.length || results.length == 0) throw error;
      res.send(results);
    });
  } catch (err) {
    res.status(500).send({err: err.sqlMessage || 'Error'});
  }
};

exports.findOne = async (req, res) => {
  try {
    const drink = await Drink.findOne({
      _id: req.params.bookId,
      userId: req.authUserId
    });
    if (drink) {
      res.send(drink);
    } else {
      res.status(404).send('No book found');
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send('title mag niet leeg zijn');
  }

  try {
    const drink = await Drink.findOneAndUpdate(
      {
        _id: req.params.bookId,
        userId: req.authUserId
      },
      {
        title: req.body.title,
        authorId: req.body.authorId
      },
      {
        new: true
      }
    );

    if (!drink) {
      return res.status(404).send('No book found');
    }
    res.send(drink);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const drink = await Drink.findOneAndRemove({
      _id: req.params.bookId,
      userId: req.authUserId
    });
    if (!drink) {
      return res.status(404).send('No book found');
    }
    res.send(drink);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};
