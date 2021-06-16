const userdbFile = 'src/api/users.json';

const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('src/api/database.json');
const userdb = JSON.parse(fs.readFileSync(userdbFile));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the username or email exists in database
function isUnique({ username, email }) {
  return (
    JSON.parse(fs.readFileSync(userdbFile)).users.findIndex(
      (user) => user.email === email || user.username === username
    ) !== -1
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    JSON.parse(fs.readFileSync(userdbFile)).users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// Get UserData from users database
function getUserData({ email, password }) {
  return userdb.users.find(
    (user) => user.email === email && user.password === password
  );
}

// Register New User
server.post('/auth/register', (req, res) => {
  console.log('register user requested...');
  const { username, email, password } = req.body;

  if (isUnique({ username, email }) === true) {
    const status = 401;
    const message = 'These credentials are already used';
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile('userdbFile', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      username: username,
      email: email,
      password: password,
    }); //add some data
    fs.writeFile(userdbFile, JSON.stringify(data), (err) => {
      // WRITE
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
    });
  });

  // Create token for new user
  const access_token = createToken({ email, password });
  console.log('Access Token:' + access_token);
  res.status(200).json({ username, access_token });
});

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log('login user requested...');
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  var username = getUserData({ email, password }).username;
  const access_token = createToken({ email, password });
  console.log('Access Token:' + access_token);
  res.status(200).json({ username, access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Access token not provided';
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log('Run Auth API Server');
});
