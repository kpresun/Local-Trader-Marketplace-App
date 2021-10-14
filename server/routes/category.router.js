const express = require('express');
const { default: logger } = require('redux-logger');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route: Get all categories from database
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM "category";`;
  pool.query(query)
  .then(dbResponse => {
      res.send(dbResponse.rows);
  })
  .catch(error => {
      res.sendStatus(500);
  })
});

module.exports = router;
