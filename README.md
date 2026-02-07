# Traka-Project - Simulador Académico Dinámico

Simulador de progreso académico para estudiantes, que permite visualizar materias por semestre, gestionar aprobaciones y validar prelaciones en tiempo real con persistencia en base de datos.

## 🚀 Arquitectura del Proyecto

El proyecto ha evolucionado de una aplicación estática a una arquitectura **Client-Server** moderna con persistencia de datos:

- **Frontend**: Interfaz moderna construida con HTML5, Tailwind CSS y JavaScript asíncrono.
- **Backend**: Servidor API construido con **Express.js**.
- **Base de Datos**: PostgreSQL gestionado a través de **Prisma ORM**.

## 🛠️ Tecnologías Usadas

- **Servidor**: Node.js, Express.js.
- **Base de Datos**: PostgreSQL.
- **ORM**: Prisma v6.4.1.
- **Frontend**: HTML5, Vanilla JS, Tailwind CSS.
- **Seguridad**: CORS, Dotenv.

## 📦 Instalación y Configuración

1. **Clonar el repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd Traka-Project
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz con tu URL de PostgreSQL:

   ```env
   DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/TU_DB?schema=public"
   ```

4. **Generar el cliente de Prisma**:
   ```bash
   npx prisma generate
   ```

## 🏃 Lanzamiento

Para iniciar el sistema completo:

1. **Iniciar el Servidor API**:

   ```bash
   node server.js
   ```

   _El servidor correrá en `http://localhost:3000`._

2. **Abrir el Frontend**:
   Abre el archivo `Front/templates/plataforma.html` en tu navegador favorito.

## 📡 Endpoints de la API

| Método | Ruta            | Descripción                                                   |
| :----- | :-------------- | :------------------------------------------------------------ |
| `GET`  | `/api/pensum`   | Obtiene todas las materias unidas al progreso del estudiante. |
| `POST` | `/api/progreso` | Actualiza o crea el estado de una materia para un estudiante. |

## 👥 Equipo Original

- **Responsable del informe**: Dayana
- **Responsable del JSON (Datos)**: Pablo
- **Diseñador de Interfaz**: Angel
- **Lógica de Prelación**: Damico
- **Programador de Horarios**: Gabriela

---

_Actualizado con persistencia dinámica mediante Prisma y Express._
