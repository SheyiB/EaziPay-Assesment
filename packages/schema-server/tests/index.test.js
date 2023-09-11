const request = require('supertest');
const app = require('../src/index'); // Replace with the actual path to your app file

describe('Test the root endpoint', () => {
  it('should return a 200 status code and welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the Schema Server!');
  });
});
