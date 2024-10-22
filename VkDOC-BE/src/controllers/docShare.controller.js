// controllers/docShareController.js
const DocumentShare = require('../models/documentShare.model');
const Document = require('../models/document.model');
const User = require('../models/user.model');

// Share a document with another user
exports.shareDocument = async (req, res) => {
    const { documentId, shared_with, permission } = req.body;

    try {
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ msg: 'Document not found' });
        }

        // Only the owner can share the document
        if (document.owner.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Access denied' });
        }

        const user = await User.findById(shared_with);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const sharedDoc = new DocumentShare({
            document: documentId,
            shared_with,
            permission
        });

        await sharedDoc.save();
        res.status(201).json({ msg: 'Document shared successfully', sharedDoc });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get shared documents for the logged-in user
exports.getSharedDocuments = async (req, res) => {
    try {
        const sharedDocuments = await DocumentShare.find({ shared_with: req.user.userId })
            .populate('document');

        res.json(sharedDocuments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
