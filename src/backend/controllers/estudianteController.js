const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- FUNCIÓN DE REGISTRO (Ya la tienes, la mantenemos igual) ---
const registrarEstudiante = async (req, res) => {
    try {
        const { cedula, nombre, apellido, email, password } = req.body;
        const nuevoEstudiante = await prisma.estudiantes.create({
            data: {
                cedula: String(cedula), 
                nombre: nombre,
                apellido: apellido,
                email: email,
                contrase_a: password 
            },
        });
        res.status(201).json({ mensaje: "¡Estudiante registrado con éxito!", id: nuevoEstudiante.id_estudiante });
    } catch (error) {
        console.error("--- ERROR REGISTRO ---", error);
        res.status(400).json({ 
            error: "No se pudo registrar", 
            detalle: error.code === 'P2002' ? "La cédula o el email ya existen" : "Error de validación"
        });
    }
};

// --- NUEVA FUNCIÓN DE LOGIN ---
const loginEstudiante = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscamos al estudiante por su email único
        const estudiante = await prisma.estudiantes.findFirst({
            where: { 
                cedula: String(email) // Buscamos en la columna cedula
            }
        });

        // 2. Validaciones
        if (!estudiante) {
            return res.status(404).json({ error: "El documento no está registrado." });
        }

        // Importante: usamos 'contrase_a' que es el nombre en tu base de datos
        if (estudiante.contrase_a !== password) {
            return res.status(401).json({ error: "Contraseña incorrecta." });
        }

        // 3. Respuesta exitosa
        // Mandamos el ID y el nombre para que el frontend sepa quién entró
        res.status(200).json({
            mensaje: "¡Inicio de sesión exitoso!",
            usuario: {
                id: estudiante.id_estudiante,
                nombre: estudiante.nombre,
                apellido: estudiante.apellido
            }
        });

    } catch (error) {
        console.error("--- ERROR LOGIN ---", error);
        res.status(500).json({ error: "Error interno del servidor al iniciar sesión." });
    }
};

// EXPORTAMOS AMBAS
module.exports = { registrarEstudiante, loginEstudiante };