
//Pablo trabaja aca

/**
 * ARCHIVO DE DATOS - GESTOR DE PENSUM INTERACTIVO
 * ---------------------------------------------------------
* - id: Único por materia (los codigos son, de 0-8 los semestres, siendo 0 cinu
        y los numeros siguientes las materias, ejemplo, matematia de cinu seria 001, pero se eliminan los ceros
        a la izquierda, quedadando 1.
        matematica 1 de primer semestre seria , 101
        el numero de materia va segun el lugar que tengan en el pensum, matematica es 1 por eso va de primero)
 * - codigo: Código oficial de la materia.
 * - nombre: Nombre de la asignatura.
 * - semestre: Semestre al que pertenece.
 * - uc: Unidades de Crédito que otorga.
 * - prelaciones: IDs de materias que deben estar aprobadas.
 * - estado: "pendiente" (por defecto), "en curso" o "aprobada".
 */
 
/**
 * ARCHIVO DE DATOS - MALLA INTERACTIVA INGENIERÍA DE SISTEMAS
 * ---------------------------------------------------------
 * ID: [Semestre][Correlativo] (Ej: 101 es Semestre 1, Materia 1)
 * ESTADO: "pendiente", "en curso", "aprobada"
 */

export const pensum = [
    // SEMESTRE 1
    {
        id: 101,
        codigo: "MAT-21215",
        nombre: "MATEMÁTICA I",
        semestre: 1,
        uc: 5,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 102,
        codigo: "MAT-21524",
        nombre: "GEOMETRÍA ANALÍTICA",
        semestre: 1,
        uc: 4,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 103,
        codigo: "ADG-25123",
        nombre: "HOMBRE, SOCIEDAD, CIENCIA Y TEC.",
        semestre: 1,
        uc: 3,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 104,
        codigo: "MAT-21212",
        nombre: "DIBUJO",
        semestre: 1,
        uc: 2,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 105,
        codigo: "ADG-25132",
        nombre: "EDUCACIÓN AMBIENTAL",
        semestre: 1,
        uc: 2,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 106,
        codigo: "IDM-24113",
        nombre: "INGLÉS I",
        semestre: 1,
        uc: 3,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 107,
        codigo: "ADG-25131",
        nombre: "SEMINARIO I",
        semestre: 1,
        uc: 1,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 108,
        codigo: "DIN-21113",
        nombre: "DEFENSA INTEGRAL DE LA NACIÓN I",
        semestre: 1,
        uc: 3,
        prelaciones: [],
        estado: "pendiente"
    },

    // SEMESTRE 2
    {
        id: 201,
        codigo: "MAT-21225",
        nombre: "MATEMÁTICA II",
        semestre: 2,
        uc: 5,
        prelaciones: [101], // Prela Matemática I
        estado: "pendiente"
    },
    {
        id: 202,
        codigo: "QUF-23015",
        nombre: "FÍSICA I",
        semestre: 2,
        uc: 5,
        prelaciones: [101, 102], // Prela Matemática I y Geometría
        estado: "pendiente"
    },
    {
        id: 203,
        codigo: "MAT-21114",
        nombre: "ÁLGEBRA LINEAL",
        semestre: 2,
        uc: 4,
        prelaciones: [102], // Prela Geometría Analítica
        estado: "pendiente"
    },
    {
        id: 204,
        codigo: "QUF-22014",
        nombre: "QUÍMICA GENERAL",
        semestre: 2,
        uc: 4,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 205,
        codigo: "IDM-24123",
        nombre: "INGLÉS II",
        semestre: 2,
        uc: 3,
        prelaciones: [106], // Prela Inglés I
        estado: "pendiente"
    },
    {
        id: 206,
        codigo: "ADG-25141",
        nombre: "SEMINARIO II",
        semestre: 2,
        uc: 1,
        prelaciones: [106],
        estado: "pendiente"
    },
    {
        id: 207,
        codigo: "DIN-21123",
        nombre: "DEFENSA INTEGRAL DE LA NACIÓN II",
        semestre: 2,
        uc: 3,
        prelaciones: [108], // Prela Defensa I
        estado: "pendiente"
    },
    {
        id: 208,
        codigo: "ADG-25121",
        nombre: "ACTIVIDAD COMPLEMENTARIA (DEPORTE I)",
        semestre: 2,
        uc: 0,
        prelaciones: [],
        estado: "pendiente"
    },
    // SEMESTRE 3
    {
        id: 301,
        codigo: "MAT-21235",
        nombre: "MATEMÁTICA III",
        semestre: 3,
        uc: 5,
        prelaciones: [201], // Prela Matemática II
        estado: "pendiente"
    },
    {
        id: 302,
        codigo: "QUF-23025",
        nombre: "FÍSICA II",
        semestre: 3,
        uc: 5,
        prelaciones: [201, 202], // Prela Matemática II y Física I
        estado: "pendiente"
    },
    {
        id: 307,
        codigo: "ADG-25122",
        nombre: "ACTIVIDAD COMPLEMENTARIA (CULTURA I)",
        semestre: 3,
        uc: 0,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 303,
        codigo: "MAT-21414",
        nombre: "PROBABILIDAD Y ESTADÍSTICA",
        semestre: 3,
        uc: 4,
        prelaciones: [201], // Prela Matemática II
        estado: "pendiente"
    },
    {
        id: 304,
        codigo: "SYC-22113",
        nombre: "PROGRAMACIÓN",
        semestre: 3,
        uc: 3,
        prelaciones: [203], // Prela Álgebra Lineal
        estado: "pendiente"
    },
    {
        id: 305,
        codigo: "AGG-22313",
        nombre: "SISTEMAS ADMINISTRATIVOS",
        semestre: 3,
        uc: 4,
        prelaciones: [], // Según matriz no tiene flecha de entrada
        estado: "pendiente"
    },
    {
        id: 306,
        codigo: "DIN-21133",
        nombre: "DEFENSA INTEGRAL DE LA NACIÓN III",
        semestre: 3,
        uc: 3,
        prelaciones: [207], // Prela Defensa II
        estado: "pendiente"
    },
    // SEMESTRE 4
    {
        id: 401,
        codigo: "MAT-31714",
        nombre: "CÁLCULO NUMÉRICO",
        semestre: 4,
        uc: 4,
        prelaciones: [301], // Prela Matemática III
        estado: "pendiente"
    },
    {
        id: 402,
        codigo: "SYC-32114",
        nombre: "TEORÍA DE LOS SISTEMAS",
        semestre: 4,
        uc: 4,
        prelaciones: [], // Sin prelación directa en matriz
        estado: "pendiente"
    },
    {
        id: 403,
        codigo: "MAT-31214",
        nombre: "LÓGICA MATEMÁTICA",
        semestre: 4,
        uc: 4,
        prelaciones: [203], // Prela Álgebra Lineal
        estado: "pendiente"
    },
    {
        id: 404,
        codigo: "SYC-32225",
        nombre: "LENGUAJE DE PROGRAMACIÓN I",
        semestre: 4,
        uc: 5,
        prelaciones: [304], // Prela Programación
        estado: "pendiente"
    },
    {
        id: 405,
        codigo: "SYC-32414",
        nombre: "PROCESAMIENTO DE DATOS",
        semestre: 4,
        uc: 4,
        prelaciones: [304], // Prela Programación
        estado: "pendiente"
    },
    {
        id: 406,
        codigo: "AGL-30214",
        nombre: "SISTEMAS DE PRODUCCIÓN",
        semestre: 4,
        uc: 4,
        prelaciones: [305], // Prela Sistemas Administrativos
        estado: "pendiente"
    },
    {
        id: 407,
        codigo: "DIN-31143",
        nombre: "DEFENSA INTEGRAL DE LA NACIÓN IV",
        semestre: 4,
        uc: 3,
        prelaciones: [306], // Prela Defensa III
        estado: "pendiente"
    },
    // SEMESTRE 5
    {
        id: 501,
        codigo: "MAT-30925",
        nombre: "INVESTIGACIÓN DE OPERACIONES",
        semestre: 5,
        uc: 5,
        prelaciones: [401], // Prela Cálculo Numérico
        estado: "pendiente"
    },
    {
        id: 502,
        codigo: "MAT-31114",
        nombre: "TEORÍA DE GRAFOS",
        semestre: 5,
        uc: 4,
        prelaciones: [403], // Prela Lógica Matemática
        estado: "pendiente"
    },
    {
        id: 503,
        codigo: "SYC-32514",
        nombre: "ANÁLISIS DE SISTEMAS",
        semestre: 5,
        uc: 4,
        prelaciones: [402], // Prela Teoría de los Sistemas
        estado: "pendiente"
    },
    {
        id: 504,
        codigo: "ELN-30514",
        nombre: "CIRCUITOS LÓGICOS",
        semestre: 5,
        uc: 4,
        prelaciones: [403], // Prela Lógica Matemática
        estado: "pendiente"
    },
    {
        id: 505,
        codigo: "SYC-32614",
        nombre: "BASES DE DATOS",
        semestre: 5,
        uc: 4,
        prelaciones: [402], // Prela Teoría de los Sistemas
        estado: "pendiente"
    },
    {
        id: 506,
        codigo: "SYC-32235",
        nombre: "LENGUAJE DE PROGRAMACIÓN II",
        semestre: 5,
        uc: 5,
        prelaciones: [404], // Prela Lenguaje de Programación I
        estado: "pendiente"
    },
    {
        id: 507,
        codigo: "ADG-10820",
        nombre: "CÁTEDRA BOLIVARIANA I",
        semestre: 5,
        uc: 0,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 508,
        codigo: "DIN-31153",
        nombre: "DEFENSA INTEGRAL DE LA NACIÓN V",
        semestre: 5,
        uc: 3,
        prelaciones: [407], // Prela Defensa IV
        estado: "pendiente"
    },
    // SEMESTRE 6
    {
        id: 601,
        codigo: "MAT-30935",
        nombre: "OPTIMIZACIÓN NO LINEAL",
        semestre: 6,
        uc: 5,
        prelaciones: [501], // Prela Investigación de Operaciones
        estado: "pendiente"
    },
    {
        id: 602,
        codigo: "MAT-31414",
        nombre: "PROCESOS ESTOCÁSTICOS",
        semestre: 6,
        uc: 4,
        prelaciones: [501, 502], // Prela Inv. de Operaciones y Teoría de Grafos
        estado: "pendiente"
    },
    {
        id: 603,
        codigo: "SYC-32524",
        nombre: "DISEÑO DE SISTEMAS",
        semestre: 6,
        uc: 4,
        prelaciones: [503], // Prela Análisis de Sistemas
        estado: "pendiente"
    },
    {
        id: 604,
        codigo: "SYC-30525",
        nombre: "ARQUITECTURA DEL COMPUTADOR",
        semestre: 6,
        uc: 5,
        prelaciones: [504], // Prela Circuitos Lógicos
        estado: "pendiente"
    },
    {
        id: 605,
        codigo: "SYC-30834",
        nombre: "SISTEMAS OPERATIVOS",
        semestre: 6,
        uc: 4,
        prelaciones: [505], // Prela Bases de Datos
        estado: "pendiente"
    },
    {
        id: 606,
        codigo: "SYC-32245",
        nombre: "LENGUAJE DE PROGRAMACIÓN III",
        semestre: 6,
        uc: 5,
        prelaciones: [506], // Prela Lenguaje de Programación II
        estado: "pendiente"
    },
    {
        id: 607,
        codigo: "ADG-10821",
        nombre: "CÁTEDRA BOLIVARIANA II",
        semestre: 6,
        uc: 0,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 608,
        codigo: "DIN-31163",
        nombre: "DEFENSA INTEGRAL DE LA NACIÓN VI",
        semestre: 6,
        uc: 3,
        prelaciones: [508], // Prela Defensa V
        estado: "pendiente"
    },
    // SEMESTRE 7
    {
        id: 701,
        codigo: "MAT-30945",
        nombre: "SIMULACIÓN Y MODELOS",
        semestre: 7,
        uc: 5,
        prelaciones: [601, 602], // Prela Optimización y Proc. Estocásticos
        estado: "pendiente"
    },
    {
        id: 702,
        codigo: "ADG-30214",
        nombre: "METODOLOGÍA DE LA INVESTIGACIÓN",
        semestre: 7,
        uc: 4,
        prelaciones: [], 
        estado: "pendiente"
    },
    {
        id: 703,
        codigo: "SYC-32714",
        nombre: "IMPLANTACIÓN DE SISTEMAS",
        semestre: 7,
        uc: 4,
        prelaciones: [603], // Prela Diseño de Sistemas
        estado: "pendiente"
    },
    {
        id: 704,
        codigo: "ADG-30224",
        nombre: "GERENCIA DE LA INFORMÁTICA",
        semestre: 7,
        uc: 4,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 705,
        codigo: "SYC-31644",
        nombre: "REDES",
        semestre: 7,
        uc: 4,
        prelaciones: [605], // Prela Sistemas Operativos
        estado: "pendiente"
    },
    {
        id: 706,
        codigo: "TAI-01",
        nombre: "TALLER DE SERVICIO COMUNITARIO",
        semestre: 7,
        uc: 0,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 707,
        codigo: "ELE-TEC-1",
        nombre: "ELECTIVA TÉCNICA I",
        semestre: 7,
        uc: 3,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 708,
        codigo: "ELE-NO-TEC-1",
        nombre: "ELECTIVA NO TÉCNICA I",
        semestre: 7,
        uc: 3,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 709,
        codigo: "DIN-31173",
        nombre: "DEFENSA INTEGRAL DE LA NACIÓN VII",
        semestre: 7,
        uc: 3,
        prelaciones: [608], // Prela Defensa VI
        estado: "pendiente"
    },
    // SEMESTRE 8
    {
        id: 801,
        codigo: "MAT-31314",
        nombre: "TEORÍA DE DECISIONES",
        semestre: 8,
        uc: 4,
        prelaciones: [701], // Prela Simulación y Modelos
        estado: "pendiente"
    },
    {
        id: 802,
        codigo: "CJU-37314",
        nombre: "MARCO LEGAL PARA EL EJERCICIO DE LA ING.",
        semestre: 8,
        uc: 4,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 803,
        codigo: "SYC-32814",
        nombre: "AUDITORÍA DE SISTEMAS",
        semestre: 8,
        uc: 4,
        prelaciones: [703], // Prela Implantación de Sistemas
        estado: "pendiente"
    },
    {
        id: 804,
        codigo: "TTC-31154",
        nombre: "TELEPROCESOS",
        semestre: 8,
        uc: 4,
        prelaciones: [705], // Prela Redes
        estado: "pendiente"
    },
    {
        id: 805,
        codigo: "PRO-01",
        nombre: "PROYECTO DE SERVICIO COMUNITARIO",
        semestre: 8,
        uc: 0,
        prelaciones: [706], // Prela Taller de Servicio Comunitario
        estado: "pendiente"
    },
    {
        id: 806,
        codigo: "ELE-TEC-2",
        nombre: "ELECTIVA TÉCNICA II",
        semestre: 8,
        uc: 3,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 807,
        codigo: "ELE-NO-TEC-2",
        nombre: "ELECTIVA NO TÉCNICA II",
        semestre: 8,
        uc: 3,
        prelaciones: [],
        estado: "pendiente"
    },
    {
        id: 808,
        codigo: "DIN-31183",
        nombre: "DEFENSA INTEGRAL DE LA NACIÓN VIII",
        semestre: 8,
        uc: 3,
        prelaciones: [709], // Prela Defensa VII
        estado: "pendiente"
    },
    // SEMESTRE 9
    {
        id: 901,
        codigo: "PSI-30010",
        nombre: "PASANTÍA",
        semestre: 9,
        uc: 10,
        prelaciones: [], // Requiere 214 UC acumuladas
        estado: "pendiente"
    },
    {
        id: 902,
        codigo: "PSI-30010",
        nombre: "TRABAJO ESPECIAL DE GRADO",
        semestre: 9,
        uc: 10,
        prelaciones: [], // Requiere 214 UC acumuladas
        estado: "pendiente"
    }
];