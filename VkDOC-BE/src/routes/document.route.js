const express = require('express');
const docController = require('../controllers/document.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', authMiddleware, docController.createDocument);
router.get('/:id', authMiddleware, docController.getDocument);
router.get('/all/:userId', authMiddleware, docController.getAllDocuments);
router.put('/:id', authMiddleware, docController.updateDocument);
router.delete('/:id', authMiddleware, docController.deleteDocument);

module.exports = router;
