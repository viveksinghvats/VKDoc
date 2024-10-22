// models/DocumentShare.js
const mongoose = require('mongoose');

const DocumentShareSchema = new mongoose.Schema({
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    shared_with: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    permission: {
        type: String,  // 'read' or 'edit'
        enum: ['read', 'edit'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const DocumentShare = mongoose.model('DocumentShare', DocumentShareSchema);
module.exports = DocumentShare;
