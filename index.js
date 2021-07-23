const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('build'))
app.get("/", (request, response) => {
    response.send("<h1> hello world</h1>")
}
)


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get("/api/persons", (request, response) => {
    response.json(persons);
})

app.use(express.json());

app.post("/api/persons", (request, response) => {
    console.log(request.body);
    const {name, number} = request.body;
    console.log(name,number)
    const isperson = persons.find(person => person.name === name)
    console.log(isperson);

    if(!name || !number || isperson) return response.status(400).json({
        error: "Content missing or not unique"
    });
    const newPerson = {
        id: Math.random(),
        "name": name,
        "number": number
    }
    persons = persons.concat(newPerson);

    response.json(newPerson);
})


app.get("/info", (request, response) => {
    const html = `
        <p1>Phone book has info for ${persons.length} people</p1>
        <br>
        <p1>${new Date()}</p1>
    `
    response.send(html);
})

app.delete("/api/persons/:id", (request,response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
})

app.get("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if(!person) return response.status(404).end();
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)