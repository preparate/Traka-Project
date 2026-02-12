import { getMateriasPorSemestre, isMateriaDisponible, UC } from './logic_horarios.js';

const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '3000' 
    ? 'http://localhost:3000' 
    : '';

/**
 * ESTADO GLOBAL DE LA APLICACIÓN
 */
let pensum = [];       
let currentSemester = 1; 
let startSemester = 1;   
const VISIBLE_SEMESTERS = 6; 
const TOTAL_SEMESTERS = 9;   

// --- CAMBIO CLAVE: Obtener el ID del usuario del localStorage ---
const usuarioId = localStorage.getItem('usuario_id');

/**
 * CARGAR DATOS DESDE LA API
 */
async function fetchPensum() {
    try {
        if (!usuarioId) {
            window.location.href = "login.html";
            return;
        }

        // --- CAMBIO CLAVE: Enviamos el id_usuario como parámetro GET ---
        const response = await fetch(`${API_BASE}/api/pensum?id_usuario=${usuarioId}`);
        
        if (!response.ok) throw new Error('Error al cargar datos');
        pensum = await response.json();
        console.log("Pensum cargado para el usuario " + usuarioId, pensum);
    } catch (error) {
        console.error("Error cargando pensum:", error);
        alert("No se pudo conectar con el servidor.");
    }
}

/**
 * RENDERIZADO DE PESTAÑAS (Se mantiene igual)
 */
function renderSemesterTabs() {
    const container = document.getElementById('semester-tabs');
    if (!container) return;
    container.innerHTML = '';
    const endSemester = Math.min(startSemester + VISIBLE_SEMESTERS - 1, TOTAL_SEMESTERS);

    for (let i = startSemester; i <= endSemester; i++) {
        const isActive = currentSemester === i;
        const btn = document.createElement('button');
        btn.className = `flex items-center gap-4 p-1.5 pr-8 rounded-2xl border transition-all duration-300 semester-animate min-w-[160px] ${
            isActive ? 'bg-indigo-900 border-indigo-900 text-white scale-[1.03]' : 'bg-white border-white/50 grayscale opacity-60'
        }`;
        
        btn.onclick = () => { currentSemester = i; renderAll(); };
        btn.innerHTML = `
            <div class="size-10 shrink-0 rounded-xl ${isActive ? 'bg-indigo-500' : 'bg-slate-100'} flex items-center justify-center font-black text-xs">${i < 10 ? '0' + i : i}</div>
            <div class="text-left overflow-hidden">
                <span class="block text-[10px] font-black uppercase tracking-[0.2em] mb-1">Semestre</span>
                <span class="block text-xs font-black truncate">Módulos</span>
            </div>`;
        container.appendChild(btn);
    }
    updateNavButtons();
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prev-semester');
    const nextBtn = document.getElementById('next-semester');
    if (prevBtn) prevBtn.disabled = startSemester === 1;
    if (nextBtn) nextBtn.disabled = startSemester + VISIBLE_SEMESTERS > TOTAL_SEMESTERS;
}

window.moveSemesters = (delta) => {
    const skip = delta * VISIBLE_SEMESTERS;
    let newStart = startSemester + skip;
    if (newStart < 1) newStart = 1;
    if (newStart > TOTAL_SEMESTERS - VISIBLE_SEMESTERS + 1) newStart = TOTAL_SEMESTERS - VISIBLE_SEMESTERS + 1;
    if (newStart !== startSemester) { startSemester = newStart; renderSemesterTabs(); }
};

/**
 * RENDERIZADO DE MATERIAS (Se mantiene igual)
 */
function renderSubjects() {
    const grid = document.getElementById('subjects-grid');
    if (!grid) return;
    const subjects = getMateriasPorSemestre(pensum, currentSemester);
    grid.innerHTML = '';

    subjects.forEach(materia => {
        const disponible = isMateriaDisponible(materia, pensum);
        const card = document.createElement('div');
        let borderClass = materia.estado === 'aprobada' ? 'border-l-emerald-500' : 'border-l-slate-300/50';
        
        card.className = `bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 ${borderClass} p-6 flex flex-col min-h-[180px] group transition-all`;
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <span class="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded border border-gray-100">${materia.codigo}</span>
                <span class="text-[10px] font-bold text-gray-300">${materia.uc} UC</span>
            </div>
            <h3 class="text-lg font-bold text-slate-800 mb-auto leading-snug">${materia.nombre}</h3>
            <div class="mt-4">
                ${materia.estado === 'aprobada' 
                    ? `<span class="text-[9px] font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 uppercase">Aprobada</span>` 
                    : `<button ${disponible ? `onclick="cambiarEstado(${materia.id}, 'aprobada')"` : 'disabled'} 
                        class="w-full py-2.5 ${disponible ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-100 text-slate-400 cursor-not-allowed'} rounded-xl text-xs font-bold transition-all uppercase">
                        ${disponible ? 'Aprobar' : 'Bloqueada'}
                       </button>`}
            </div>`;
        grid.appendChild(card);
    });
}

function updateDashboard() {
    const compUC = UC(pensum, 'aprobada');
    const totalUC = 240;
    const progress = (compUC / totalUC) * 100;
    const elPercent = document.getElementById('progress-percent');
    const elCircle = document.getElementById('progress-circle');
    const elUC = document.getElementById('progress-text-uc');
    const elBarLinear = document.getElementById('progress-bar-linear');

    if (elPercent) elPercent.innerText = `${Math.round(progress)}%`;
    if (elCircle) {
        const circumference = 2 * Math.PI * 42;
        elCircle.style.strokeDashoffset = circumference - (progress / 100) * circumference;
    }
    if (elUC) elUC.innerText = `${compUC} de ${totalUC} UC`;
    if (elBarLinear) elBarLinear.style.width = `${progress}%`;
}

/**
 * CAMBIO DE ESTADO (VÍA API)
 */
window.cambiarEstado = async (id, nuevoEstado) => {
    const materia = pensum.find(m => m.id === id);
    if (nuevoEstado === 'aprobada' && !isMateriaDisponible(materia, pensum)) {
        alert('❌ BLOQUEADO: Prelaciones pendientes.');
        return;
    }

    try {
        // --- CAMBIO CLAVE: Enviamos el id_usuario en el body ---
        const response = await fetch(`${API_BASE}/api/progreso`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id_materia: id, 
                estado: nuevoEstado,
                id_usuario: usuarioId // <-- Aquí está la magia
            })
        });
        
        if (!response.ok) throw new Error('Error al guardar progreso');
        if (materia) materia.estado = nuevoEstado;
        renderAll();
    } catch (error) {
        alert("Error al guardar el progreso.");
    }
};

window.resetProgress = async () => {
    if (confirm('¿Deseas borrar TODO tu avance?')) {
        try {
            // --- CAMBIO CLAVE: Enviamos quién quiere resetear ---
            const response = await fetch(`${API_BASE}/api/progreso/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario: usuarioId })
            });
            if (!response.ok) throw new Error('Error al reiniciar');
            await fetchPensum();
            currentSemester = 1;
            renderAll();
        } catch (error) {
            alert("Error al reiniciar progreso.");
        }
    }
};

function renderAll() {
    renderSemesterTabs();
    renderSubjects();
    updateDashboard();
}

function loadUserProfile() {
    const nombre = localStorage.getItem('usuario_nombre');
    const apellido = localStorage.getItem('usuario_apellido') || "";
    const cedula = localStorage.getItem('usuario_cedula') || "";
    const userNameElement = document.getElementById('user-name');
    const userCedulaElement = document.getElementById('user-cedula');
    const userInitialsElement = document.getElementById('user-initials');

    if (nombre) {
        if (userNameElement) userNameElement.textContent = `${nombre} ${apellido}`;
        if (userCedulaElement) userCedulaElement.textContent = `V-${cedula}`;
        const iniciales = (nombre.charAt(0) + (apellido.charAt(0) || "")).toUpperCase();
        if (userInitialsElement) userInitialsElement.textContent = iniciales;
    } else {
        window.location.href = "login.html";
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    loadUserProfile();
    await fetchPensum();
    renderAll();
});