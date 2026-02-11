-- CreateEnum
CREATE TYPE "estado_materia" AS ENUM ('pendiente', 'en curso', 'aprobada');

-- CreateTable
CREATE TABLE "estudiantes" (
    "id_estudiante" SERIAL NOT NULL,
    "cedula" VARCHAR(15) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contraseña" VARCHAR(255) NOT NULL,
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estudiantes_pkey" PRIMARY KEY ("id_estudiante")
);

-- CreateTable
CREATE TABLE "materias" (
    "id_materia" INTEGER NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "semestre" INTEGER NOT NULL,
    "uc" INTEGER NOT NULL,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id_materia")
);

-- CreateTable
CREATE TABLE "prelaciones" (
    "id_materia" INTEGER NOT NULL,
    "id_prelante" INTEGER NOT NULL,

    CONSTRAINT "prelaciones_pkey" PRIMARY KEY ("id_materia","id_prelante")
);

-- CreateTable
CREATE TABLE "progreso_academico" (
    "id_estudiante" INTEGER NOT NULL,
    "id_materia" INTEGER NOT NULL,
    "estado" "estado_materia" DEFAULT 'pendiente',
    "nota" DECIMAL(4,2),
    "fecha_aprobacion" DATE,

    CONSTRAINT "progreso_academico_pkey" PRIMARY KEY ("id_estudiante","id_materia")
);

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_cedula_key" ON "estudiantes"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_email_key" ON "estudiantes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "materias_codigo_key" ON "materias"("codigo");

-- CreateIndex
CREATE INDEX "idx_materias_codigo" ON "materias"("codigo");

-- CreateIndex
CREATE INDEX "idx_materias_semestre" ON "materias"("semestre");

-- CreateIndex
CREATE INDEX "idx_prelaciones_materia" ON "prelaciones"("id_materia");

-- CreateIndex
CREATE INDEX "idx_prelaciones_prelante" ON "prelaciones"("id_prelante");

-- CreateIndex
CREATE INDEX "idx_progreso_estudiante" ON "progreso_academico"("id_estudiante");

-- CreateIndex
CREATE INDEX "idx_progreso_materia" ON "progreso_academico"("id_materia");

-- AddForeignKey
ALTER TABLE "prelaciones" ADD CONSTRAINT "prelaciones_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materias"("id_materia") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prelaciones" ADD CONSTRAINT "prelaciones_id_prelante_fkey" FOREIGN KEY ("id_prelante") REFERENCES "materias"("id_materia") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progreso_academico" ADD CONSTRAINT "progreso_academico_id_estudiante_fkey" FOREIGN KEY ("id_estudiante") REFERENCES "estudiantes"("id_estudiante") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progreso_academico" ADD CONSTRAINT "progreso_academico_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materias"("id_materia") ON DELETE NO ACTION ON UPDATE NO ACTION;
