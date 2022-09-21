const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");

router.get('/', async (req, res) => {
    // GET data from mongoDB
    const foundProjects = await Project.find();
    // console.log(foundProjects);
    res.json(foundProjects);
});

module.exports = router;