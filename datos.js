
//Pablo trabaja aca

/**
 * ARCHIVO DE DATOS 
 * ---------------------------------------------------------
 * Este archivo contiene la "Base de Datos" del pensum.
 * * ESTRUCTURA DEL OBJETO:
 * - id: Único por materia (los codigos son, de 0-8 los semestres, siendo 0 cinu
        y los numeros siguientes las materias, ejemplo, matematia de cinu seria 001, pero se eliminan los ceros
        a la izquierda, quedadando 1, matematica 1 de primer semestre seria , 101
        el numero de materia va segun el lugar que tengan en el pensum, matematica es 1 por eso va de primero)
 * - nombre: Nombre oficial de la asignatura.
 * - semestre: Número del semestre (0 para Propedéutico).
 * - uc: Unidades de Crédito.
 * - prelaciones: Array con los IDs de las materias necesarias para cursar esta.
 * - secciones: Array de objetos que contienen:
 * * nombreSeccion: ID de la sección (Ej: "D1").
 * * profesor: Nombre del docente (String vacío si es por llenar).
 * * bloques: Array de horarios.
 * - dia: Nombre del día (Lunes, Martes, etc.).
 * - inicio/fin: Formato MILITAR numérico (Ej: 0830 para 8:30 AM, 1300 para 1:00 PM).
 * - salon: Ubicación física (Ej: "ASMA 008").
 * * NOTA PARA PROGRAMADORES: No olvidar las comas entre objetos y 
 * mantener la consistencia en los nombres de los días (Primera letra Mayúscula).
 */

export const pensum = [
    {
        id: 1,
        nombre: "Matemática",
        semestre: 0,
        uc: 0,
        prelaciones: [],
        secciones: [
            {
                nombreSeccion: "D1",
                bloques: [
                    { dia: "Lunes", inicio: 1300, fin: 1730, tipo: "Teoría", salon: "ASMA 008" }
                ]
            }
        ]
    },
    {
        id: 2,
        nombre: "Lenguaje y Comunicación",
        semestre: 0,
        uc: 0,
        prelaciones: [],
        secciones: [
            {
                nombreSeccion: "D1",
                bloques: [
                    { dia: "Martes", inicio: 1300, fin: 1730, tipo: "Teoría", salon: "ASMA 008" }
                ]
            }
        ]
    },
    {
        id: 3,
        nombre: "Filosofía, Ética y Valores de la UNEFA",
        semestre: 0,
        uc: 0,
        prelaciones: [],
        secciones: [
            {
                nombreSeccion: "D1",
                bloques: [
                    { dia: "Lunes", inicio: 1000, fin: 1300, tipo: "Teoría", salon: "ASMA 008" }
                ]
            }
        ]
    },
    {
        id: 4, 
        codigo: "", 
        nombre: "Defensa Integral de la Nación",
        semestre: 0,
        uc: 0,
        prelaciones: [],
        secciones: [
            {
                nombreSeccion: "D1",
                bloques: [
                    { dia: "Lunes", inicio: 830, fin: 1000, tipo: "Teoría", salon: "ASMA 008" }
                ]
            }
        ]
    }
];

