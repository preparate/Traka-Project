const express = require('express');
const router = express.Router();
// Aquí "desestructuramos" para traer las funciones directamente
const { registrarEstudiante, loginEstudiante } = require('../controllers/estudianteController');

// Ahora las usamos directamente sin el "estudianteController." delante
router.post('/registro', registrarEstudiante);
router.post('/login', loginEstudiante);

module.exports = router;