const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log('Removed all');
// });

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()
// Todo.findOneAndRemove({_id: '5af49db1685fbf0494f3dd59'}).then((todo) => {
//   console.log(todo);
// });


Todo.findByIdAndRemove('5af49db1685fbf0494f3dd59').then((todo) => {
  console.log(todo);
});