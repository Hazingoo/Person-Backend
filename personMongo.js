const mongoose = require('mongoose');

if (process.argv.length < 5) {
  console.log('You need to have at least 5 arguements');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://Guan_Ha:${password}@cluster0.voyig.mongodb.net/persons-application`;

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name,
  number,
});

// person.save().then(result => {
//     console.log("note saved");
//     mongoose.connection.close()
// })

Person.find({}).then((persons) => {
  persons.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
