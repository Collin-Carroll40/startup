const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('pipelinepro');

// Collections
const userCollection = db.collection('users');
const leadCollection = db.collection('leads');
const cadenceCollection = db.collection('cadences');
const importCollection = db.collection('imports');
const claimedCollection = db.collection('claimed');

// Test connection
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
  console.log(`Connected to MongoDB database`);
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// --- User functions ---
async function getUser(field, value) {
  if (!value) return null;
  if (field === 'email') {
    return userCollection.findOne({ email: value });
  }
  return userCollection.findOne({ token: value });
}

async function createUser(email, passwordHash) {
  const user = { email, password: passwordHash, token: '' };
  await userCollection.insertOne(user);
  return user;
}

async function updateUserToken(email, token) {
  await userCollection.updateOne({ email }, { $set: { token } });
}

// --- Lead functions ---
async function getLeads() {
  const leads = await leadCollection.find({}).toArray();
  if (leads.length === 0) {
    const defaults = [
      { date: '01/07/2026', desc: 'Roofing Lead - Orem' },
      { date: '01/09/2026', desc: 'Plumbing Lead - Provo' },
      { date: '01/21/2026', desc: 'HVAC Lead - Lehi' },
      { date: '02/01/2026', desc: 'Electrical Lead - Sandy' },
      { date: '02/14/2026', desc: 'Painting Lead - Draper' },
    ];
    await leadCollection.insertMany(defaults);
    return defaults;
  }
  return leads;
}

async function removeLead(index) {
  const leads = await leadCollection.find({}).toArray();
  if (index >= 0 && index < leads.length) {
    await leadCollection.deleteOne({ _id: leads[index]._id });
  }
  return leadCollection.find({}).toArray();
}

// --- Claimed leads functions ---
async function getClaimed(email) {
  const doc = await claimedCollection.findOne({ email });
  return doc ? doc.leads : [];
}

async function addClaimed(email, lead) {
  const doc = await claimedCollection.findOne({ email });
  if (doc) {
    doc.leads.push(lead);
    await claimedCollection.updateOne({ email }, { $set: { leads: doc.leads } });
  } else {
    await claimedCollection.insertOne({ email, leads: [lead] });
  }
}

// --- Cadence functions ---
async function getCadence(email) {
  const doc = await cadenceCollection.findOne({ email });
  if (doc) return doc.steps;
  return [
    { id: 1, method: 'Email', content: '' },
    { id: 2, method: 'SMS', content: '' },
  ];
}

async function saveCadence(email, steps) {
  await cadenceCollection.updateOne(
    { email },
    { $set: { email, steps } },
    { upsert: true }
  );
  return steps;
}

// --- Import functions ---
async function getImports(email) {
  const doc = await importCollection.findOne({ email });
  if (doc) return doc.files;
  return ['Jan_Batch.csv (Success)', 'Dec_Batch.xlsx (Failed)'];
}

async function addImport(email, filename) {
  const doc = await importCollection.findOne({ email });
  if (doc) {
    doc.files.push(filename);
    await importCollection.updateOne({ email }, { $set: { files: doc.files } });
    return doc.files;
  } else {
    const files = ['Jan_Batch.csv (Success)', 'Dec_Batch.xlsx (Failed)', filename];
    await importCollection.insertOne({ email, files });
    return files;
  }
}

module.exports = {
  getUser,
  createUser,
  updateUserToken,
  getLeads,
  removeLead,
  getClaimed,
  addClaimed,
  getCadence,
  saveCadence,
  getImports,
  addImport,
};