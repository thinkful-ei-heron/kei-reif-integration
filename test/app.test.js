const supertest = require('supertest');
const app = require('../app');
const data = require('../playstore');
const { expect } = require('chai');

describe('test the app', () => {
  it('/apps should return all [apps] + 200', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.deep.equal(data);
      });
  });
  it('/apps?sort____ 400', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: '' })
      .expect(400);
  });
  // /apps?sort=app should return sorted apps by name
  // /apps?sort=rating should return sorted apps by rating
  it('/apps?genre??? 400', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'test' })
      .expect(400);
  });
  // /apps?genre(does exist) should return filtered list with only that genre
  // /apps?sort+genre should return filtered and sorted list
});
