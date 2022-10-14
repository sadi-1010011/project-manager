const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");

// READ ALL PROJECTS
router.route("/").get( async (req, res) => {
    // return all available projects
    const currentProject = await Project.find();
    res.json(currentProject);
});


// CREATE NEW PROJECT
router.route("/create").post((req, res) => {
    // get data from frontend
    const { type, name, description, date, state } = req.body;
    const newProject = new Project({
        type, name, description, date, state,
        progress: [],
    });
    // save to DB -
    newProject.save();
    res.status(200).send('created project!');
});


// GET PROJECT BY ID
router.route("/:id").get( async (req, res) => {
    const projectid = req.params.id;
    const currentProject = await Project.findById(projectid);
    res.json(currentProject);
});


// DELETE A PROJECT
router.route("/:id").delete((req, res) => {
    // delete by ID
    const projectid = req.params.id;
    Project.findByIdAndDelete(projectid)
        .then(() => res.json('project deleted!'))
        .catch(err => res.status(400).json("error deleting project: ", err));
});

// UPDATE A PROJECT
router.route("/update/:id").post( async (req, res) => {
    // update by id 
    const projectId = req.params.id;
    console.log('updating: ', projectId);
    const { state, type, name, description, date } = req.body;
    Project.findById(projectId)
        .then(project => {
            project.state = state,
            project.type = type,
            project.name = name,
            project.description = description,
            project.date = Date.parse(date);
            // project.progress = [...project.progress]

            project.save()
                .then(() => res.json('project updated!'))
                .catch(err => res.status(400).json('error: ', err));
        })
        .catch(err => res.status(400).json('error updating project: ', err));
});

module.exports = router;