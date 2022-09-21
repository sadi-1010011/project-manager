const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");

// GET PROJECT BY ID
router.route("/:id").get( async (req, res) => {
    const currentProject = await Project.findById(req.params.id);
    res.json(currentProject);
});

// CREATE NEW PROJECT
router.route("/create").post((req, res) => {
    // get data from frontend -
    const { type, name, description, date } = req.body;
    const newProject = new Project({
        state: 'current',
        type, name, description, date
    });
    // save to DB -
    newProject.save();
    res.sendStatus(200);
});


module.exports = router;