const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Register
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await DB.createUser(req.body.email, passwordHash);
    const token = uuid.v4();
    await DB.updateUserToken(user.email, token);
    setAuthCookie(res, token);
    res.send({ email: user.email });
  }
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser('email', req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = uuid.v4();
    await DB.updateUserToken(user.email, token);
    setAuthCookie(res, token);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await DB.getUser('token', req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserToken(user.email, '');
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Auth middleware
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Get leads
apiRouter.get('/leads', verifyAuth, async (_req, res) => {
  const leads = await DB.getLeads();
  res.send(leads);
});

// Claim lead
apiRouter.post('/leads/claim', verifyAuth, async (req, res) => {
  const { index } = req.body;
  const leads = await DB.removeLead(index);
  res.send(leads);
});

// Get cadence for user
apiRouter.get('/cadence', verifyAuth, async (req, res) => {
  const cadence = await DB.getCadence(req.user.email);
  res.send(cadence);
});

// Save cadence for user
apiRouter.post('/cadence', verifyAuth, async (req, res) => {
  const cadence = await DB.saveCadence(req.user.email, req.body.steps);
  res.send(cadence);
});

// Get import history
apiRouter.get('/imports', verifyAuth, async (req, res) => {
  const imports = await DB.getImports(req.user.email);
  res.send(imports);
});

// Add import record
apiRouter.post('/imports', verifyAuth, async (req, res) => {
  const imports = await DB.addImport(req.user.email, req.body.filename);
  res.send(imports);
});

// Test route
app.get('/api/test', (_req, res) => {
  res.send({ msg: 'Pipeline Pro service running' });
});

// Fallback
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpServer = app.listen(port, () => {
  console.log(`Pipeline Pro service listening on port ${port}`);
});

peerProxy(httpServer);