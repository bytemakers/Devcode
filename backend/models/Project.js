const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ProjectSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    languages: {
        type: Array,
        required: true
    },
    repoName: {
        type: String,
        required: true
    },
    repoLink: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('project', ProjectSchema);