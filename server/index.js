const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const {connection} = require('./app/middleware/mysqlLib');
connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

const app = express();
const upload = multer();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(upload.any());
app.use(bodyParser.urlencoded({extended: true}));


require('./app/routes/auth.routes.js')(app);
require('./app/routes/messages.routes.js')(app);
require('./app/routes/projects.routes.js')(app);
require('./app/routes/events.routes.js')(app);

app.use(express.static(`public`));

app.listen(process.env.PORT, () => {
  console.log(`Server luistert op poort ${process.env.PORT}`);
});
