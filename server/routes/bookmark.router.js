const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log('--log-- The req.body is:', req.body);
  const userId = req.body.user_id
  const productId = req.body.id;
  console.log(req.user.id); // maybe req.user?
  const query = `INSERT INTO "bookmark" ("user_id", "product_id")
                VALUES ($1, $2);`;
  // RETURNING "id" - might not need
    pool.query(query, [userId, productId])
    .then(dbResponse => {
      res.sendStatus(200);
        // res.send(dbResponse.rows);
    })
    .catch(error => {
        console.log('--ERROR-- unable to return bookmark:', error);
        res.sendStatus(500);
    })
});

/**
 * GET route: Will return all bookmarks from bookmark table
 */
 router.get('/', (req, res) => {
    const query = `SELECT "bookmark".id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description			
    FROM "product" JOIN "bookmark"
    ON "product".id = "bookmark".product_id
    JOIN "user" ON "bookmark".user_id = "user".id;`;
    pool.query(query)
    .then(dbResponse => {
      console.log('--log-- router.get, successfully returned bookmarks:', dbResponse);
      res.send(dbResponse.rows);
    })
    .catch(error => {
      console.log('--ERROR-- router.get, unable to return bookmarks:', error);
      res.sendStatus(500);
    })
  });


  /**
 * GET route: Will return only a single bookmark from bookmark table
 */
 router.get('/detail/:id', (req, res) => {
   const productId = req.params.id;
   console.log('--LOG-- router.get, req.params.id is:', productId);
  const query = `SELECT "bookmark".id, "bookmark".product_id, "product".image_url,
  "product".name, "product".price, "product".description			
  FROM "product" JOIN "bookmark"
  ON "product".id = "bookmark".product_id
  JOIN "user" ON "bookmark".user_id = "user".id
  WHERE "bookmark".product_id = $1;`;
  pool.query(query, [productId])
  .then(dbResponse => {
    console.log('--log-- router.get detail/:id, successfully returned single bookmark:', dbResponse.rows);
    res.send(dbResponse.rows);
  })
  .catch(error => {
    console.log('--ERROR-- router.get, detail/:id unable to return single bookmarks:', error);
    res.sendStatus(500);
  })
});

module.exports = router;


//back up as I change query
// /**
//  * GET route: Will return bookmarks from bookmark table
//  */
//  router.get('/', (req, res) => {
//   const query = `SELECT * FROM "bookmark";`;
//   pool.query(query)
//   .then(dbResponse => {
//     console.log('--log-- router.get, successfully returned bookmarks:', dbResponse);
//     res.send(dbResponse.rows);
//   })
//   .catch(error => {
//     console.log('--ERROR-- router.get, unable to return bookmarks:', error);
//     res.sendStatus(500);
//   })
// });