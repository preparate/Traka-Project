const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportTable(tableName) {
  console.log(`Exportando ${tableName}...`);
  const data = await prisma[tableName].findMany();
  const filePath = path.join(__dirname, '..', 'prisma', 'seed_data', `${tableName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`¡${tableName} exportado a ${filePath}!`);
}

async function main() {
  try {
    const tables = ['estudiantes', 'materias', 'prelaciones', 'progreso_academico'];
    
    for (const table of tables) {
      await exportTable(table);
    }
    
    console.log('\n--- Exportación completada con éxito ---');
  } catch (error) {
    console.error('Error durante la exportación:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
