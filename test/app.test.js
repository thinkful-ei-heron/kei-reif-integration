const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

// /apps should return all [apps] + 200
// /apps?sort____ 400
// /apps?sort=app should return sorted apps by name
// /apps?sort=rating should return sorted apps by rating
// /apps?genre??? 400
// /apps?genre(does exist) should return filtered list with only that genre
// /apps?sort+genre should return filtered and sorted list
