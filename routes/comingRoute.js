const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");

router.get('/', (req, res) => {
    res.send('coming page-');
});

module.exports = router;