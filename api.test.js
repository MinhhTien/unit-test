const request = require('supertest');
const baseURL = 'http://localhost:3000';
const crypto = require('crypto');

describe('GET /todo', () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: 'Drink water',
    completed: false,
  };
  beforeAll(async () => {
    await request(baseURL).post('/todo').send(newTodo);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/todo/${newTodo.id}`);
  });

  it('should return status code 200', async () => {
    const response = await request(baseURL).get('/todo');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeNull();
  });
  it('should return todo', async () => {
    const response = await request(baseURL).get('/todo');
    expect(response.body.data.length >= 1).toBeTruthy()
  });
});

describe('POST /todo', () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: 'Learning Jest',
    completed: false,
  };
  afterAll(async () => {
    await request(baseURL).delete(`/todo/${newTodo.id}`);
  });
  it('should add an item to todo array', async () => {
    const response = await request(baseURL).post('/todo').send(newTodo);
    const lastItem = response.body.data[response.body.data.length - 1];
    expect(response.statusCode).toBe(201);
    expect(lastItem.item).toBe(newTodo['item']);
    expect(lastItem.completed).toBe(newTodo['completed']);
  });
});

describe('PUT /todo/:id', () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: 'Use unit test',
    completed: false,
  };
  beforeAll(async () => {
    await request(baseURL).post('/todo').send(newTodo);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/todo/${newTodo.id}`);
  });
  it('should update item if it exists', async () => {
    const response = await request(baseURL).put(`/todo/${newTodo.id}`).send({
      completed: true,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.completed).toBeTruthy()
  });
});

describe('DELETE /todo/:id', () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: 'Prepare for test',
    completed: false,
  };
  beforeAll(async () => {
    await request(baseURL).post('/todo').send(newTodo);
  });
  it('should delete one item', async () => {
    const response = await request(baseURL).delete(`/todo/${newTodo.id}`);
    const todoList = response.body.data;
    const isExisted = todoList.find((todo) => {
      newTodo.id == todo.id;
    });
    expect(isExisted).toBeUndefined();
  });
});
