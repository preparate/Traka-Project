# 🚀 Traka-Project - Simulador Académico UNEFA

Simulador dinámico de progreso académico diseñado para estudiantes de Ingeniería de Sistemas. Permite visualizar la malla curricular, gestionar aprobaciones de materias y validar automáticamente las prelaciones en tiempo real con persistencia en base de datos.

## 📂 Organización del Proyecto (Arquitectura)

El proyecto sigue una estructura modular separando claramente el **Backend** y el **Frontend** dentro de la carpeta `/src`:

```text
/src
├── /backend            # Lógica del Servidor (API Express)
│   ├── /config         # Conexión Prisma y scripts de Semilla
│   ├── /controllers    # Lógica de negocio (Pensum y Progreso)
│   ├── /routes         # Definición de rutas API
│   └── app.js          # Configuración principal de Express
├── /frontend           # Interfaz de Usuario (UI)
│   ├── /public         # Estructura HTML (plataforma.html, login.html)
│   └── /assets         # Recursos (CSS compilado, Lógica JS del cliente)
server.js               # Punto de entrada para arrancar el servidor
```

## 🛠️ Tecnologías y Requisitos

- **Backend**: Node.js v24+, Express.js.
- **Base de Datos**: PostgreSQL.
- **ORM**: Prisma (v6.4.1).
- **Frontend**: HTML5, Vanilla JavaScript, Tailwind CSS (v4).

## 📦 Instalación y Setup Inicial

1. **Clonar e instalar**:

   ```bash
   git clone <url-del-repositorio>
   cd Traka-Project
   npm install
   ```

2. **Configurar Base de Datos**:
   Crea un archivo `.env` en la raíz con la URL de tu base de datos:

   ```env
   DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/TU_DB?schema=public"
   ```

3. **Preparar Prisma**:
   ```bash
   npx prisma generate
   npx prisma db push  # Crea las tablas si no existen
   ```

## 🏃 Scripts de Desarrollo

He configurado varios comandos en `package.json` para facilitar el trabajo:

| Comando             | Descripción                                                                       |
| :------------------ | :-------------------------------------------------------------------------------- |
| `npm run dev`       | Inicia el servidor de Node (`server.js`) en `http://localhost:3000`.              |
| `npm run build:css` | Compila manualmente el CSS de Tailwind.                                           |
| `npm run watch:css` | Modo "observador" de Tailwind para actualizar estilos en vivo mientras programas. |
| `npm run db:seed`   | **Exporta** tus datos locales de la DB a archivos JSON en `prisma/seed_data/`.    |

## 👥 Compartiendo Datos (Seed)

Para que todos los integrantes del equipo trabajen con el mismo pensum:

1. **Para exportar**: Ejecuta `npm run db:seed`. Sube los cambios de `prisma/seed_data/` al repositorio.
2. **Para importar**: Tus compañeros deben ejecutar:
   ```bash
   npx prisma db seed
   ```

## 📡 API Endpoints

| Método | Ruta                  | Descripción                                                   |
| :----- | :-------------------- | :------------------------------------------------------------ |
| `GET`  | `/api/pensum`         | Retorna todas las materias unidas al progreso del estudiante. |
| `POST` | `/api/progreso`       | Actualiza o crea el estado de una materia.                    |
| `POST` | `/api/progreso/reset` | Borra todo el progreso académico del estudiante.              |

---

_Proyecto Traka - Desarrollado para la optimización académica en la UNEFA._
