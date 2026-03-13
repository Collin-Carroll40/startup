const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';

// In-memory storage
let users = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Register
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Auth middleware
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// In-memory leads
let leads = [
  { date: '01/07/2026', desc: 'Roofing Lead - Orem' },
  { date: '01/09/2026', desc: 'Plumbing Lead - Provo' },
  { date: '01/21/2026', desc: 'HVAC Lead - Lehi' },
  { date: '02/01/2026', desc: 'Electrical Lead - Sandy' },
  { date: '02/14/2026', desc: 'Painting Lead - Draper' }
];

// Get leads
apiRouter.get('/leads', verifyAuth, (_req, res) => {
  res.send(leads);
});

// Claim lead
apiRouter.post('/leads/claim', verifyAuth, (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < leads.length) {
    leads.splice(index, 1);
  }
  res.send(leads);
});

// In-memory cadences
let cadences = {};

// Get cadence for user
apiRouter.get('/cadence', verifyAuth, (req, res) => {
  const userCadence = cadences[req.user.email] || [
    { id: 1, method: 'Email', content: '' },
    { id: 2, method: 'SMS', content: '' }
  ];
  res.send(userCadence);
});

// In-memory imports
let imports = {};

// Get import history
apiRouter.get('/imports', verifyAuth, (req, res) => {
  const userImports = imports[req.user.email] || [
    'Jan_Batch.csv (Success)',
    'Dec_Batch.xlsx (Failed)'
  ];
  res.send(userImports);
});

// Add import record
apiRouter.post('/imports', verifyAuth, (req, res) => {
  if (!imports[req.user.email]) {
    imports[req.user.email] = [
      'Jan_Batch.csv (Success)',
      'Dec_Batch.xlsx (Failed)'
    ];
  }
  imports[req.user.email].push(req.body.filename);
  res.send(imports[req.user.email]);
});

// Save cadence for user
apiRouter.post('/cadence', verifyAuth, (req, res) => {
  cadences[req.user.email] = req.body.steps;
  res.send(cadences[req.user.email]);
});

// Test route
app.get('/api/test', (_req, res) => {
  res.send({ msg: 'Pipeline Pro service running' });
});

// Fallback
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Helpers
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Pipeline Pro service listening on port ${port}`);
});