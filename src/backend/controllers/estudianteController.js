const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registrarEstudiante = async (req, res) => {
    try {
        const { cedula, nombre, apellido, email, password } = req.body;

        const nuevoEstudiante = await prisma.estudiantes.create({
            data: {
                // Cedula debe ser String según tu schema
                cedula: String(cedula), 
                nombre: nombre,
                apellido: apellido,
                email: email,
                // Usamos el nombre exacto que definieron: contrase_a
                contrase_a: password 
            },
        });

        res.status(201).json({ 
            mensaje: "¡Estudiante registrado con éxito!", 
            id: nuevoEstudiante.id_estudiante 
        });

    } catch (error) {
        console.error("--- ERROR REAL ---");
        console.error(error); // Esto te dirá en la consola si el email ya existe
        
        res.status(400).json({ 
            error: "No se pudo registrar", 
            detalle: error.code === 'P2002' ? "La cédula o el email ya existen" : "Error de validación"
        });
    }
};

module.exports = { registrarEstudiante };