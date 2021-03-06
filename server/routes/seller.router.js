const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route: Gets all table columns from user table that equals id.
 */
router.get('/:id', (req, res) => {
    const sellerId = req.params.id;
    console.log('--LOG-- router.get, req.params.id is:', sellerId);
    const query = `SELECT * from "user" WHERE "id" = $1;`;
    pool.query(query, [sellerId])
    .then(dbResponse => {
        res.send(dbResponse.rows[0]);
    })
    .catch(error => {
        console.log('--ERROR-- router.get, seller, unable to return the seller:', error);
        res.sendStatus(500);
    })
});

module.exports = router;