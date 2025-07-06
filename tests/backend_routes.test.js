const request = require('supertest');
const express = require('express');
const routes = require('../backend/routes/index');

describe('Backend API Routes', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use('/', routes);
  });

  it('GET / should return API Home', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('API Home');
  });
}); 