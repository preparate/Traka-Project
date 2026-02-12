const prisma = require('../config/prisma');

const getPensum = async (req, res) => {
    try {
        // Obtenemos el ID de la URL (query string)
        const id_estudiante = parseInt(req.query.id_usuario); 
        
        if (!id_estudiante) return res.status(400).json({ error: 'ID de usuario es requerido' });

        const materias = await prisma.materias.findMany({
            include: { prelaciones_prelaciones_id_materiaTomaterias: true },
            orderBy: { semestre: 'asc' }
        });
        
        const progreso = await prisma.progreso_academico.findMany({
            where: { id_estudiante }
        });
        
        const pensumConEstado = materias.map(m => {
            const p = progreso.find(prog => prog.id_materia === m.id_materia);
            return {
                id: m.id_materia,
                codigo: m.codigo,
                nombre: m.nombre,
                semestre: m.semestre,
                uc: m.uc,
                estado: p ? p.estado : 'pendiente',
                prelaciones: m.prelaciones_prelaciones_id_materiaTomaterias.map(pre => pre.id_prelante)
            };
        });
        
        res.json(pensumConEstado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el pensum' });
    }
};

const resetProgreso = async (req, res) => {
    // Para borrar, también necesitamos saber de quién
    const id_estudiante = parseInt(req.body.id_usuario); 
    try {
        await prisma.progreso_academico.deleteMany({
            where: { id_estudiante }
        });
        res.json({ message: 'Progreso reiniciado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al reiniciar el progreso' });
    }
};

const updateProgreso = async (req, res) => {
    // Aquí recibimos el ID del estudiante en el cuerpo del mensaje (body)
    const { id_materia, estado, id_usuario } = req.body;
    const id_estudiante = parseInt(id_usuario);
    
    try {
        const actualizacion = await prisma.progreso_academico.upsert({
            where: {
                id_estudiante_id_materia: { id_estudiante, id_materia }
            },
            update: { estado },
            create: { id_estudiante, id_materia, estado }
        });
        res.json(actualizacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el progreso' });
    }
};

module.exports = { getPensum, resetProgreso, updateProgreso };