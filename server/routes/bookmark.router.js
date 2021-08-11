const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route: bookmarks item to bookmark table
 */
router.post('/', (req, res) => {
  console.log('--log-- The req.body is:', req.body);
  console.log('--LOG-- what is the current users id?', req.user.id);
  const userId = req.user.id;
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
 router.get('/user/:id', (req, res) => {
   userId = req.params.id;
   console.log('--LOG-- the params.id is:', userId);
    const query = `SELECT "bookmark".id, "bookmark".user_id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type			
    FROM "product" JOIN "bookmark"
    ON "product".id = "bookmark".product_id
    JOIN "user" ON "bookmark".user_id = "user".id
    JOIN "category" ON "category".id = "product".category_id
    JOIN "status" ON "status".id = "product".status_id
    WHERE "bookmark".user_id = $1;`;
    pool.query(query, [userId])
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
  const query = `SELECT "bookmark".id, "bookmark".user_id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type			
  FROM "product" JOIN "bookmark"
  ON "product".id = "bookmark".product_id
  JOIN "user" ON "bookmark".user_id = "user".id
  JOIN "category" ON "category".id = "product".category_id
  JOIN "status" ON "status".id = "product".status_id
  WHERE "bookmark".product_id = $1;`;
  pool.query(query, [productId])
  .then(dbResponse => {
    console.log('--log-- router.get detail/:id, successfully returned single bookmark:', dbResponse.rows);
    res.send(dbResponse.rows[0]);
  })
  .catch(error => {
    console.log('--ERROR-- router.get, detail/:id unable to return single bookmarks:', error);
    res.sendStatus(500);
  })
});


/**
 * Router Delete: uses the targeted ID to locate and delete bookmarked item. 
 */
router.delete('/:id', (req, res) => {
  const deleteId = req.params.id;
  console.log('--LOG-- Inside router.delete, deleteId is:', deleteId );
  const query = `DELETE FROM "bookmark" WHERE "id" = $1;`;
  pool.query(query, [deleteId])
  .then( dbResponse => {
    res.sendStatus(200);
  })
  .catch( error => {
    console.log('--ERROR-- Unable to delete ID from bookmark:', error);
    res.sendStatus(500);
  })
});

module.exports = router;