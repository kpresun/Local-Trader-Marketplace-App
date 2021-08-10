const express = require('express');
const { default: logger } = require('redux-logger');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM "category";`;
  pool.query(query)
  .then(dbResponse => {
      res.send(dbResponse.rows);
  })
  .catch(error => {
      console.log('--ERROR-- router.get, unable to return categories:', error);
      res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
