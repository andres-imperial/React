// Express Server
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Database
var JsonDB = require('node-json-db');
// Second Arg: If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
var db = new JsonDB('data', true, false);

// GET
router.get('/api/users', (req, res) => {
  //Get the data from the users
  var data = db.getData("/users");
  res.json(data);
});

// POST
router.post('/api/users', function(req, res) {
  var users = db.getData("/users");
  // If user exist respond with error
  if (users.find(user => user.username === req.body.username)){
    res.status(500).send('Error: User already exists');
  }
  else{
    res.send('User added to DB');
    db.push('/users[]', req.body, true);
  }
});

app.use(router);

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});
