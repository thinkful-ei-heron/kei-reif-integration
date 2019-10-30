const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
const appsData = require('./playstore');

app.get('/', (req, res) => {
  res.send('server works');
});

app.get('/apps', (req, res) => {
  let sortedData;

  if ('sort' in req.query) {
    if (req.query.sort === 'app') {
      // sort by App (app name)
      sortedData = appsData.sort((a, b) => (a.App > b.App ? 1 : -1));
    } else if (req.query.sort === 'rating') {
      // sort by rating
      sortedData = appsData.sort((a, b) => (a.Rating > b.Rating ? 1 : -1));
    } else {
      return res.status(400).json({ error: 'sort should be rating or app' });
    }
  } else {
    sortedData = appsData;
  }

  if ('genre' in req.query) {
    if (
      ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].indexOf(
        req.query.genre
      ) >= 0
    ) {
      sortedData = sortedData.filter(item =>
        item.Genres.toLowerCase().includes(req.query.genre)
      );
    } else {
      return res.status(400).json({ error: 'genre does not exist' });
    }
  }

  res.status(200).json(sortedData);
});

// app.get('/frequency', (req, res) => {
//   const { s } = req.query;

//   if (!s) {
//     return res.status(400).send('nope');
//   }

//   const counts = s
//     .toLowerCase()
//     .split('')
//     .reduce((acc, curr) => {
//       if (acc[curr]) {
//         acc[curr]++;
//       } else {
//         acc[curr] = 1;
//       }
//       return acc;
//     }, {});

//   const unique = Object.keys(counts).length;
//   const avg = s.length / unique;
//   let highest = '';
//   let highestVal = 0;

//   Object.keys(counts).forEach(k => {
//     if (counts[k] > highestVal) {
//       highestVal = counts[k];
//       highest = k;
//     }
//   });

//   counts.unique = unique;
//   counts.avg = avg;
//   counts.highest = highest;
//   res.json(counts);
// });

module.exports = app;
