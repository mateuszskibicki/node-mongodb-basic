const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mangoose} = require('./db/mongoose');
//load models
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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

// UPDATE

app.patch('/todos/:id', (req, res) => {
  var todoID = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(todoID)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(todoID, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
// model, save, status etc, pick body

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});



app.listen(port, () => {
  console.log('Started on port ' + port);
});

module.exports = {app};