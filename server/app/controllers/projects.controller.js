
exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(500).send({err: 'title can not be empty'});
  }

  const drink = new Drink({
    name: req.body.title,
    id: req.body.authorId,
    price: req.authUserId
  });

  drink
    .save()
    .then(drink => res.send(drink))
    .catch(err => {
      res.status(500).send({error: err.drink || 'Error'});
    });
};

exports.findAll = async (req, res) => {
  try {
    const projects = await connection.query('SELECT * FROM `projects`',  (error, results, fields) => {
      if (error || results.length || results.length == 0) throw error;
      console.log(results);
      return results;
    });
    res.send(projects);
  } catch (err) {
    res.status(500).send({err: err.project || 'Error'});
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
