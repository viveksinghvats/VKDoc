// models/Document.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: Array, // Use an array to store structured Slate.js content
        default: [
            {
                type: 'paragraph',
                children: [{ text: '' }] // Default structure for a blank document
            }
        ]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Document = mongoose.model('Document', DocumentSchema);
module.exports = Document;
