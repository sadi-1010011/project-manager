const mongoose = require("mongoose");


// model of project data
const projectSchema = {
    state: {
        type: String,
        required: true
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
    progressbar: {
        type: Number
    },
    progress: [ {
        description: {
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
    ]
}

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;