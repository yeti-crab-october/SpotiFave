//middlware to to handle the incoming information from the get request
const { Pool } = require('pg');
const db = require('./Models/FakeDataModel.js');

const musicControllers = {};

musicControllers.getUser = (req, res, next) => {
  console.log('shit');
  const userInfo = [req.body.username, req.body.password];
  const sql = `INSERT INTO users (name, password) VALUES ($1, $2);`;
  db.query(sql, userInfo)
    .then(data => {
        return next()
    })
    .catch(e => {
        return next(e)
    })
}

module.exports = musicControllers;