const request = require('supertest');
const { app } = require('../src/index');
const { resetTasks, listTasks } = require('../src/tasks/store');

describe('Task routes', () => {
  beforeEach(() => {
    resetTasks();
  });

  test('GET /tasks returns seeded tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(res.body.tasks.length).toBe(5);
  });

  test('POST /tasks adds a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ text: 'New Jest Task' })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/added successfully/i);
    expect(listTasks().includes('New Jest Task')).toBe(true);
  });

  test('POST /tasks without text returns 400', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({})
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/missing required field/i);
  });

  test('DELETE /tasks/:index removes task', async () => {
    const initial = listTasks().length;
    const res = await request(app).delete('/tasks/0');
    expect(res.status).toBe(204);
    expect(listTasks().length).toBe(initial - 1);
  });

  test('DELETE /tasks/:index out of range returns 404', async () => {
    const res = await request(app).delete('/tasks/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  test('DELETE /tasks/:index non-numeric returns 400', async () => {
    const res = await request(app).delete('/tasks/abc');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/non-negative integer/i);
  });
});
