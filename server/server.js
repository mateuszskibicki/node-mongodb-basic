var express = require('express');
var bodyParser = require('body-parser');

var {mangoose} = require('./db/mongoose');
//load models
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(400).send(doc);
  }, (e) => {
    console.log(e);
  })
})



app.listen(3000, () => {
  console.log('Started on port 3000');
});