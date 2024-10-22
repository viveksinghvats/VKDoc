// models/File.js
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    file_url: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model('File', FileSchema);
module.exports = File;
