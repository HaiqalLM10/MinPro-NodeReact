const { randomId, resError, resSuccess } = require('../helper.js');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//bad idea
const JWT_SECRET = "{8367E87C-B794-4A04-89DD-15FE7FDBFF78}"

module.exports = {
  login: async (req, res) => {
    try {

      if (!req.body.username || !req.body.password) {
        return resError({ req, res, msg: "username or password is missing!" })
      }

      let user = JSON.parse(fs.readFileSync(`./auth/user.json`));
      user = user.find(v => v.username === req.body.username)
      const succesHash = await bcrypt.compare(req.body.password, user.password)

      if (!succesHash) {
        return resError({ req, res, msg: "password/username invalid" })
      }

      const payLoad = { "username": user.username}

      const token = jwt.sign(payLoad, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' })
      const users = JSON.parse(fs.readFileSync(`./auth/user.json`));
      const idx = users.findIndex((user) => user.username === req.body.username);

      users[idx] = { ...users[idx], token };
      fs.writeFileSync(`./auth/user.json`, JSON.stringify(users, null, 2), 'utf8')

      logger({ type: 'success', method: req.method, path: req.path, ctx: token });
      res.status(200).json({ status: "success", token })
    } catch (err) {
      resError({ req, res, err })
    }
  },
  register: async (req, res) => {
    try {
      const users = JSON.parse(fs.readFileSync(`./auth/user.json`));
      const user = users.find(v => v.username === req.body.username);
      if (user) {
        logger({ type: 'err', method: req.method, path: '/register', ctx: 'already registered' });
        resError({ req, res, code: 409, msg: "already registered" })
        return
      };

      const hash = await bcrypt.hash(req.body.password, 10)

      const newUser = { id: randomId(), ...req.body, password: hash };
      users.push(newUser);
      fs.writeFileSync(`./auth/user.json`, JSON.stringify(users, null, 2), 'utf8')

      logger({ type: 'ok', method: req.method, path: req.path, ctx: 'register success!' });
      res.status(200).json({ status: "success", "message": 'register success'})
    } catch (err) {
      resError({ req, res, err })
    }
  },
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers['authorization'];
      const split = token.split(' ')[1];
      console.log("split: ", split)

      jwt.verify(split, JWT_SECRET, (err) => {
        if (err) {
          resError({ req, res, code: 403,  msg: "Forbidden" });
        } else {
          next();
        }
      });

    } catch (err) {
      resError({ req, res, err })
    }
  },
}

