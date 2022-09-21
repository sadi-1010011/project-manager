const mongoose = require("mongoose");

// model of progress data
const progressSchema = {
    type: {
        type: String,
        lowercase: true,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: () => Date.now()
    }
}

// model of project data
const projectSchema = {
    state: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    name: String,
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    progress: [mongoose.SchemaTypes.ObjectId]
}

const Project = mongoose.model("Project", projectSchema);
const Progress = mongoose.model("Progress", progressSchema);

module.exports = Project;