const express = require('express');
const router = express.Router();
const pensumController = require('../controllers/pensumController');
const estudianteRoutes = require('./estudianteRoutes');

// Rutas de Pensum y Progreso
router.get('/pensum', pensumController.getPensum);
router.post('/progreso/reset', pensumController.resetProgreso);
router.post('/progreso', pensumController.updateProgreso);

router.use('/estudiantes', estudianteRoutes);

module.exports = router;
