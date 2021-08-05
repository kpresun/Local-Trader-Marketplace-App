const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route: Will return all the products in the product table in db. 
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM "product" ORDER BY "created_date" ASC;`;
    pool.query(query)
    .then(dbResponse => {
        console.log(dbResponse);
        res.send(dbResponse.rows);
    })
    .catch(error => {
        console.log('--ERROR-- route.get, unable to return db rows:', error);
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