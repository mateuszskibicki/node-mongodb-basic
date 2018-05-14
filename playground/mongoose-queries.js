const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5af943679463f40788181a671';
// var text = 'eat';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// //http://mongoosejs.com/docs/queries.html
// // in mongoose we don't have to manually add new ObjectID()
// //returns array
// Todo.find({
//   text
// }).then((todos) => {
//   console.log('Todos ', todos);
// })

// //return document -> better with one
// // Todo.findOne({
// //   _id: id 
// // }).then((todo) => {
// //   console.log('Todo ', todo);
// // })

// //return by ID
// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by ID ', todo);
// }).catch((e) => {
//   //console.log(e)
// });

var userId = '5af4ab935e83de0dccc27357';

if (!ObjectID.isValid(userId)) {
  console.log('ID not valid');
} else {
  User.findById(userId).then((user) => {
    if (user){
      //console.log(user);
      console.log(JSON.stringify(user, undefined, 2));
    } else {
      console.log('User not found.');
    }
  }).catch((e) => console.log('Something went wrong.'))
}

