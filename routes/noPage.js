const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>");
  });

module.exports = router;