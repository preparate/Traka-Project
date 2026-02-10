const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importTable(tableName, primaryKey) {
  const filePath = path.join(__dirname, 'seed_data', `${tableName}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Archivo no encontrado para ${tableName}, saltando...`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log(`Importando ${data.length} registros en ${tableName}...`);

  for (const item of data) {
    if (tableName === 'estudiantes') {
      await prisma.estudiantes.upsert({
        where: { id_estudiante: item.id_estudiante },
        update: item,
        create: item,
      });
    } else if (tableName === 'materias') {
      await prisma.materias.upsert({
        where: { id_materia: item.id_materia },
        update: item,
        create: item,
      });
    } else if (tableName === 'prelaciones') {
      await prisma.prelaciones.upsert({
        where: {
          id_materia_id_prelante: {
            id_materia: item.id_materia,
            id_prelante: item.id_prelante
          }
        },
        update: item,
        create: item,
      });
    } else if (tableName === 'progreso_academico') {
      await prisma.progreso_academico.upsert({
        where: {
          id_estudiante_id_materia: {
            id_estudiante: item.id_estudiante,
            id_materia: item.id_materia
          }
        },
        update: item,
        create: item,
      });
    }
  }
  console.log(`¡${tableName} importado con éxito!`);
}

async function main() {
  try {
    // Orden importante por las claves foráneas
    await importTable('estudiantes', 'id_estudiante');
    await importTable('materias', 'id_materia');
    await importTable('prelaciones', ['id_materia', 'id_prelante']);
    await importTable('progreso_academico', ['id_estudiante', 'id_materia']);

    console.log('\n--- Seed completado con éxito ---');
  } catch (error) {
    console.error('Error durante el seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
