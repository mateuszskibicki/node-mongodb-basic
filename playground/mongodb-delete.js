//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to mongoDB !!');
  const db = client.db('TodoApp');

  // deleteMany 
  // db.collection('Todos').deleteMany({text: "MOREEEEE"}).then((result) => {
  //   console.log(result);
  // });
  // deleteOne
  // db.collection('Todos').deleteOne({text: "Something to do"}).then((result) => {
  //   console.log(result);
  // });
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });


    // db.collection('Users').deleteMany({
    //   name: "Foka"
    // }).then((result) => {
    //   console.log(result);
    // });



  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5af48ad93bd22a1d1c284d97")
  }).then((result) => {
    console.log(result);
  });






  //client.close();

  //5af48ad93bd22a1d1c284d97
});
