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
    const { type, name, description, date, state, progressbar } = req.body;
    const newProject = new Project({
        type, name, description, date, state, progressbar,
        progress: [],
    });
    // save to DB -
    newProject.save();
    res.status(200).send('project created!');
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
            project.progressbar = progressbar // to be customized ..
            // project.progress = [...project.progress]

            project.save()
                .then(() => res.json('project updated!'))
                .catch(err => res.status(400).send('error: ', err));
        })
        .catch(err => res.status(400).send('error updating project: ', err));
});


// UPDATE Any PROGRESS
router.route("/:id/updateprogress").post( async (req, res) => {
    // append progress
    const projectId = req.params.id;
    // find and update
    await Project.findById(projectId)
        .then(project => {
            project.progress = [...req.body.progress];
            project.progressbar = req.body.progressbar;
            project.save()
                .then(() => res.json('progress updated!'))
                .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json('error updating progress: ', err));
});

module.exports = router;