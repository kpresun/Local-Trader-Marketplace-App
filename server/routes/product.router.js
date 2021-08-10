const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route: Will return all the products in the product table in db. 
 */
router.get('/', (req, res) => {
  const query = `SELECT  "product".id, "product".user_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type, "product".created_date
  FROM "product" JOIN "category"
  ON "product".category_id = "category".id
  JOIN "status" ON "status".id = "product".status_id
  ORDER BY "product".created_date ASC;`;
    pool.query(query)
    .then(dbResponse => {
        res.send(dbResponse.rows);
    })
    .catch(error => {
        console.log('--ERROR-- route.get, unable to return db rows:', error);
        res.sendStatus(500);
    })
});

router.get('/:id', (req, res) => {
  const listingId = req.params.id;
  console.log('--LOG-- router.get for listing item, the id is:', listingId);
  const query = `SELECT * from "product" WHERE "product".id = $1;`;
  pool.query(query, [listingId])
  .then(dbResponse => {
    res.send(dbResponse.rows[0]);
  })
  .catch(error => {
    console.log('--ERROR-- Unable to return listing detail:', error);
    res.sendStatus(500);
  })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
