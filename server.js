const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint para obtener todas las materias con su progreso para un estudiante (simulado x ahora)
// Nota: En un sistema real, el id_estudiante vendría de la sesión/token
app.get('/api/pensum', async (req, res) => {
    try {
        const id_estudiante = 1; // ID fijo para demostración
        
        // Obtener todas las materias
        const materias = await prisma.materias.findMany({
            orderBy: { semestre: 'asc' }
        });
        
        // Obtener el progreso del estudiante
        const progreso = await prisma.progreso_academico.findMany({
            where: { id_estudiante }
        });
        
        // Combinar datos para que el frontend reciba el formato que espera
        const pensumConEstado = materias.map(m => {
            const p = progreso.find(prog => prog.id_materia === m.id_materia);
            return {
                id: m.id_materia,
                codigo: m.codigo,
                nombre: m.nombre,
                semestre: m.semestre,
                uc: m.uc,
                estado: p ? p.estado : 'pendiente',
                // Aquí podrías agregar prelaciones si las necesitas en el front
                prelaciones: [] // Por ahora vacío, se puede expandir
            };
        });
        
        res.json(pensumConEstado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el pensum' });
    }
});

// Endpoint para actualizar el estado de una materia
app.post('/api/progreso', async (req, res) => {
    const { id_materia, estado } = req.body;
    const id_estudiante = 1; // ID fijo para demostración
    
    try {
        const actualizacion = await prisma.progreso_academico.upsert({
            where: {
                id_estudiante_id_materia: {
                    id_estudiante,
                    id_materia
                }
            },
            update: { estado },
            create: {
                id_estudiante,
                id_materia,
                estado
            }
        });
        res.json(actualizacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el progreso' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
