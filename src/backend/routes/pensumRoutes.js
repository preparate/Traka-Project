const express = require('express');
const router = express.Router();
const pensumController = require('../controllers/pensumController');

// Rutas para la malla curricular
router.get('/', pensumController.getPensum);
router.post('/update', pensumController.updateProgreso);
router.post('/reset', pensumController.resetProgreso);

module.exports = router;