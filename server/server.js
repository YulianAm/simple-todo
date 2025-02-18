const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

// Define a route for the root path
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'client', 'index.html');
    console.log(`Attempting to serve: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving file:', err);
        }
    });
});

// In-memory storage for simplicity
let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    const newTodo = { id: Date.now(), text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});