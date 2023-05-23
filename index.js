const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const todoList = [];

app.get('/todo', (req, res) => {
  return res.status(200).json({
    data: todoList,
    error: null,
  });
});

app.post('/todo', (req, res) => {
  try {
    const { id, item, completed } = req.body;
    const newTodo = {
      id,
      item,
      completed,
    };
    todoList.push(newTodo);
    return res.status(201).json({
      data: todoList,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: error,
    });
  }
});

app.put('/todo/:id', (req, res) => {
  try {
    const id = req.params.id;
    const todo = todoList.find((todo) => todo.id == id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.completed = req.body.completed;
    return res.status(200).json({
      data: todo,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: error,
    });
  }
});

app.delete('/todo/:id', (req, res) => {
  try {
    const id = req.params.id;
    const todo = todoList[0];
    if (todo) {
      todoList.splice(id, 1);
    }
    return res.status(200).json({
      data: todoList,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
