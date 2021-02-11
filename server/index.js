const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const isDevelopment = (process.env.NODE_ENV === 'development');
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
let options = {};
if (isDevelopment) {
  options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
  };
}

const server = require(isDevelopment ? 'https' : 'http').Server(options, app);
const port = process.env.PORT || 443;
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(upload.any());
app.use(bodyParser.urlencoded({extended: true}));


require('./app/routes/auth.routes.js')(app);
require('./app/routes/messages.routes.js')(app);
require('./app/routes/projects.routes.js')(app);
require('./app/routes/events.routes.js')(app);

app.use(express.static(`public/`));
server.listen(port, () => {
  console.log(`Server luistert op poort ${port}`);
});
