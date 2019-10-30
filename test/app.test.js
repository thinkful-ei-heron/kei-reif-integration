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
  it('/apps?sort is not valid 400', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'test' })
      .expect(400);
  });
  it('/apps?sort=app should return sorted apps by name', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'app' })
      .then(res => {
        expect(res.body[0].App).to.equal('Angry Birds Rio') &&
          expect(res.body[res.body.length - 1].App).to.equal('slither.io');
      });
  });
  it('/apps?sort=rating should return sorted apps by rating', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'rating' })
      .then(res => {
        expect(res.body[0].Rating).to.equal(4.2) &&
          expect(res.body[res.body.length - 1].Rating).to.equal(4.7);
      });
  });
  it('/apps?genre does not exist 400', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: '' })
      .expect(400);
  });
  it('/apps?genre??? is not a valid genre 400', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'test' })
      .expect(400);
  });
  it('/apps?genre exists and returns filtered list', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'puzzle'})
      .then(res => {
        expect(res.body[0].App).to.equal('Block Puzzle Classic Legend !') &&
          expect(res.body[res.body.length - 1].App).to.equal('Block Puzzle');
      });
  });
  it('/apps?sort: rating +genre should return filtered and sorted list', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'rating', genre: 'puzzle'})
      .then(res => {
        expect(res.body[0].App).to.equal('Block Puzzle Classic Legend !') &&
          expect(res.body[res.body.length - 1].App).to.equal('Block Puzzle');
      });
  });
  it('/apps?sort: rating +genre should return filtered and sorted list', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'puzzle', sort: 'app'})
      .then(res => {
        expect(res.body[0].App).to.equal('Block Puzzle') &&
          expect(res.body[res.body.length - 1].App).to.equal('Block Puzzle Classic Legend !');
      });
  });
});
