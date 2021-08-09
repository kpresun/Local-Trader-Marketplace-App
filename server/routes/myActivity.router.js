const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route: Returns a list of items that the current user is selling
 */
router.get('/:id', (req, res) => {
    thisUser = req.user.id;
    console.log('--LOG-- router.get myActivity.router, the current user is:', thisUser);
  const query = `SELECT * from "product" WHERE "product".user_id = $1;`
  pool.query(query, [thisUser])
  .then(dbResponse => {
      res.send(dbResponse.rows);
  })
  .catch(error => {
      console.log('--ERROR-- unable to return user selling items:', error);
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
