const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route: Returns a list of items that the current user is selling
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const thisUser = req.user.id;
  const query = `  SELECT  "product".id, "product".user_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type, "product".created_date
  FROM "product" JOIN "category"
  ON "product".category_id = "category".id
  JOIN "status" ON "status".id = "product".status_id
  WHERE "product".user_id = $1;`
  pool.query(query, [thisUser])
  .then(dbResponse => {
      res.send(dbResponse.rows);
  })
  .catch(error => {
      console.log('--ERROR-- unable to return user selling items:', error);
      res.sendStatus(500);
  })
});

// /**
//  * POST route template
//  */
// router.post('/', (req, res) => {
//   // POST route code here
// });

module.exports = router;
