const request = require('supertest');

const {register, login, refreshToken, logout} = require('../controllers/authController');


describe('Authentication routes', () => {
  
  test('POST /api/v1/auth/register should return 201 on successful registration', async () => {
    const request = { 
      body : {
        name: "Tester Pandey",
        email: "tester@gmail.com",
        password: "superPassword@Cool271"
      }
    };
    const response = await register(request)
    console.log(response);
    expect(response.status).toBe(201);
  });
});
