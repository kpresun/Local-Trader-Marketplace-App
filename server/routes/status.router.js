const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const query = `SELECT * FROM "status";`;
    pool.query(query)
    .then(dbResponse => {
        res.send(dbResponse.rows);
    })
    .catch(error => {
        console.log('--ERROR--, status router.get, unable to return statuses:', error);
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
