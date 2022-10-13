const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");

router.get('/', async (req, res) => {
    // GET data from mongoDB - only coming
    const foundProjects = await Project.find({
        "state" : "coming"
    });
    console.log('FETCH PROJECTS ');
    res.json(foundProjects);
});

module.exports = router;