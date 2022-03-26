const express = require('express');
const settingsController = require('../controllers/settings');

const router = express.Router();

router.get('/tests', settingsController.getTestsSettings);

module.exports = router;
