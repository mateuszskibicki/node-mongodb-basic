var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mangoose} = require('./db/mongoose');
//load models
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//heorku
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    console.log(e);
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /user/123422222

app.get('/users/:id', (req, res) => {
  var userId = req.params.id;
  if (!ObjectID.isValid(userId)) {
    return res.status(404).send({error: 'User ID is not valid'});
  } else {
    User.findById(userId).then((user) => {
      if (!user) {
        return res.status(400).send({error: 'User not found in DB'});
      }
      res.status(200).send(user);
    }).catch((e) => res.status(400).send());
  }
});

//GET /todos/:id

app.get('/todos/:id', (req, res) => {
  var todoID = req.params.id;
  if (!ObjectID.isValid(todoID)) {
    return res.status(404).send({error: 'Todo ID is not valid'});
  } else {
    Todo.findById(todoID).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      //res.status(200).send({todo}); object
      res.status(200).send({todo});
    }).catch((e) => res.status(400).send());
  }
});

// delete

app.delete('/todos/:id', (req, res) => {
  // get the id
  // not valid ? return 404
  // remove todo by id
    //success
      //if no doc, send 404
      //send doc back with 200
    //error 
      //400 with empty body

  var todoID = req.params.id;
  if(!ObjectID.isValid(todoID)) {
    return res.status(404).send();
  } 

  Todo.findByIdAndRemove(todoID).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    } else {
      return res.status(200).send(todo);
    }
  }).catch((e) => {
    res.status(400).send();
  })
});



app.listen(port, () => {
  console.log('Started on port ' + port);
});

module.exports = {app};