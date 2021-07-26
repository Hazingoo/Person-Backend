const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(cors());
app.use(express.static('build'));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.get('/', (request, response) => {
  response.send('<h1> hello world</h1>');
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.use(express.json());

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;
  let isperson;
  Person.find({}).then((persons) => {
    isperson = persons.find((person) => person.name === name);
  });
  if (!name || !number || isperson) {
    return response.status(400).json({
      error: 'Content missing or not unique',
    });
  }
  const newPerson = new Person({
    name,
    number,
  });
  const error = newPerson.validateSync();
  if (error) throw new Error(error);
  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  response.json(newPerson);
});

app.patch('/api/persons/:name', (request, response, next) => {
  const { number } = request.body;
  const { name } = request.params;
  const newPerson = {
    name,
    number,
  };
  Person.find({}).then((persons) => {
    let id;
    persons.forEach((person) => {
      if (person.name === name) {
        id = person.id;
      }
    });
    return id;
  }).then((id) => {
    Person.findByIdAndUpdate(id, newPerson, { new: true })
      .then((updatedNote) => {
        response.json(updatedNote.toJSON());
      });
  })
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p1>Phone book has info for 
                ${persons.length}
                people</p1>
                <br>
                <p1>${new Date()}</p1>
                `,
    );
  });
});

app.delete('/api/persons/:name', (request, response, next) => {
  let id;
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person.name);
      if (person.name === request.params.name) {
        Person.findByIdAndRemove(person.id).then((result) => {
          response.send(204).end();
        });
      }
    });
  })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(errorHandler);
app.use(unknownEndpoint);

const { PORT } = process.env;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
