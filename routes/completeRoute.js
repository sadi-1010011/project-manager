const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");

router.get('/', async (req, res) => {
    // GET data from mongoDB - only complete
    const foundProjects = await Project.find({
        "state" : "complete"
    });
    console.log('FETCH PROJECTS - complete ');
    res.json(foundProjects);
});

module.exports = router;