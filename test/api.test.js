const request = require('supertest');

const app = require('../src/app');
const {application} = require('express');
const {Context} = require('mocha');

/**
 * Testing get all user endpoint
 */
describe('GET /users', () => {
  it('respond with json containing a list of all users', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing user endpoint by giving an existing user
 */
describe('GET /users/:id', () => {
  it('respond with json containing a single user', (done) => {
    request(app)
      .get('/users/U0001')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('respond with json "User U0001 Found" when the user exists', (done) => {
    request(app)
      .get('/users/U0001')
      .set('Acept', 'aplication/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect('"User U0001 Found"')
      .end((error) => {
        if (error) return done(error);
        done();
      });
  });

  it('respond with json user not found when the user does not exists', (done) => {
    request(app)
      .get('/users/nonexistinguser')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"User Not Found"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('Post /users', () => {
  it('respond with 201 created', (done) => {
    const data = {
      username: 'anbreaker',
      password: 'pass123',
    };
    request(app)
      .post('/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect(201)
      .end((error) => {
        if (error) return done(error);
        done();
      });
  });

  it('respond with code 400 on bad request', (done) => {
    const data = {};
    request(app)
      .post('/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect('"User Not Created"')
      .end((error) => {
        if (error) return done(error);
        done();
      });
  });
});
