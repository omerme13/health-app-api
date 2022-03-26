const express = require('express');
const testsController = require('../controllers/tests');

const router = express.Router();
router.get('/', testsController.getTests);
router.post('/test', testsController.getTestResult);

module.exports = router;  
