const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

// Test route
app.get('/api/test', (_req, res) => {
  res.send({ msg: 'Pipeline Pro service running' });
});

// Fallback
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Pipeline Pro service listening on port ${port}`);
});