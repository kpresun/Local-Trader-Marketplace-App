const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route: adds item to bookmark
 */
router.post('/', (req, res) => {
  const userId = req.user.id;
  const productId = req.body.id;

  const query = `INSERT INTO "bookmark" ("user_id", "product_id")
                VALUES ($1, $2);`;
    pool.query(query, [userId, productId])
    .then(dbResponse => {
      res.sendStatus(200);
    })
    .catch(error => {
        res.sendStatus(500);
    })
});

/**
 * GET route: Will return all bookmarks from bookmark table
 */
 router.get('/user/:id', (req, res) => {
   userId = req.params.id;
    const query = `SELECT "bookmark".id, "bookmark".user_id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type			
    FROM "product" JOIN "bookmark"
    ON "product".id = "bookmark".product_id
    JOIN "user" ON "bookmark".user_id = "user".id
    JOIN "category" ON "category".id = "product".category_id
    JOIN "status" ON "status".id = "product".status_id
    WHERE "bookmark".user_id = $1;`;
    pool.query(query, [userId])
    .then(dbResponse => {
      res.send(dbResponse.rows);
    })
    .catch(error => {
      res.sendStatus(500);
    })
  });

  /**
 * GET route: Will return only a single bookmark from bookmark table
 */
 router.get('/detail/:id', (req, res) => {
   const productId = req.params.id;
  const query = `SELECT "bookmark".id, "product".user_id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type			
  FROM "product" JOIN "bookmark"
  ON "product".id = "bookmark".product_id
  JOIN "user" ON "bookmark".user_id = "user".id
  JOIN "category" ON "category".id = "product".category_id
  JOIN "status" ON "status".id = "product".status_id
  WHERE "product".id = $1;`;
  pool.query(query, [productId])
  .then(dbResponse => {
    res.send(dbResponse.rows[0]);
  })
  .catch(error => {
    res.sendStatus(500);
  })
});


/**
 * Router Delete: uses the targeted ID to locate and delete bookmarked item. 
 */
router.delete('/:id', (req, res) => {
  const deleteId = req.params.id;
  const query = `DELETE FROM "bookmark" WHERE "id" = $1;`;
  pool.query(query, [deleteId])
  .then( dbResponse => {
    res.sendStatus(200);
  })
  .catch( error => {
    res.sendStatus(500);
  })
});

module.exports = router;