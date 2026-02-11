const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// La ruta completa será: /api/estudiantes/registro
router.post('/registro', estudianteController.registrarEstudiante);

module.exports = router;