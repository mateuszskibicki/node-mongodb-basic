//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to mongoDB !!');
  const db = client.db('TodoApp');

  //findOneAndUpdate 5af471560767982dd494cc39

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5af49709d434123158076c5f')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5af471560767982dd494cc39')
  }, {
    $set: {
      name: 'Hehehoho'
    },
    $inc: {
      age: -10
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })






  //client.close();

  //5af48ad93bd22a1d1c284d97
});
