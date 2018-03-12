const express = require('express');
const path = require('path');

const data = require('./data');

const TIMEOUT = 1000;

const app = express();
app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/index.html'));
});

app.get('/api/:type', (req, res) => {
  const type = req.params.type;
  console.log('Fetching', type);

  // Added timeout to simulate database fetching delay
  setTimeout(()=> {
    switch(type) {
    case 'cats':
      res.json(data.catsList);
      break;
    case 'sharks':
      res.json(data.sharksList);
      break;
    default:
      res.json(data.catsList.concat(data.sharksList));
      break;
    }
  }, TIMEOUT);
});

app.get('*', (req, res) => {
  res.send({
    errorMessage: 'Unknown request'
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});