// routes/docShareRoutes.js
const express = require('express');
const { shareDocument, getSharedDocuments } = require('../controllers/docShare.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/share', authMiddleware, shareDocument);
router.get('/shared', authMiddleware, getSharedDocuments);

module.exports = router;
