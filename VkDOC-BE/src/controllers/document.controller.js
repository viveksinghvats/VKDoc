// controllers/docController.js
const Document = require('../models/document.model');
const DocumentShare = require('../models/documentShare.model');
const User = require('../models/user.model');

// Create a new document
exports.createDocument = async (req, res) => {
    const { title, content } = req.body;

    try {
        const document = new Document({
            title,
            content,
            owner: req.user.userId
        });

        await document.save();
        res.status(201).json(document);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get a document by ID
exports.getDocument = async (req, res) => {
    const { id } = req.params;

    try {
        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({ msg: 'Document not found' });
        }

        // Check ownership or sharing permissions
        if (document.owner.toString() !== req.user.userId) {
            const sharedDoc = await DocumentShare.findOne({
                document: id,
                shared_with: req.user.userId
            });

            if (!sharedDoc || sharedDoc.permission === 'read') {
                return res.status(403).json({ msg: 'Access denied' });
            }
        }

        res.json(document);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Update a document by ID
exports.updateDocument = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({ msg: 'Document not found' });
        }

        // Check if the user has 'edit' permissions
        if (document.owner.toString() !== req.user.userId) {
            const sharedDoc = await DocumentShare.findOne({
                document: id,
                shared_with: req.user.userId,
                permission: 'edit'
            });

            if (!sharedDoc) {
                return res.status(403).json({ msg: 'Access denied' });
            }
        }

        document.title = title || document.title;
        document.content = content || document.content;
        document.updatedAt = Date.now();

        await document.save();
        res.json(document);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Delete a document by ID
exports.deleteDocument = async (req, res) => {
    const { id } = req.params;

    try {
        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({ msg: 'Document not found' });
        }

        // Only the owner can delete the document
        if (document.owner.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Access denied' });
        }

        await document.remove();
        res.json({ msg: 'Document removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getAllDocuments = async(req, res) => {
    const { userId } = req.params;

    try {
        const documents = await Document.find({owner: userId});
        res.json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
