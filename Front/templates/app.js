// Eliminamos los imports estáticos que no funcionan en el navegador con Prisma
import { getMateriasPorSemestre, isMateriaDisponible, UC } from '../../logic_horarios.js';

/**
 * ESTADO GLOBAL DE LA APLICACIÓN
 */
let pensum = [];       // Se cargará desde la base de datos
let currentSemester = 1; 
let startSemester = 1;   
const VISIBLE_SEMESTERS = 6; 
const TOTAL_SEMESTERS = 9;   

/**
 * CARGAR DATOS DESDE LA API
 */
async function fetchPensum() {
    try {
        const response = await fetch('http://localhost:3000/api/pensum');
        if (!response.ok) throw new Error('Error al cargar datos');
        pensum = await response.json();
        console.log("Pensum cargado de DB:", pensum);
    } catch (error) {
        console.error("Error cargando pensum:", error);
        alert("No se pudo conectar con el servidor. Asegúrate de que server.js esté corriendo.");
    }
}

/**
 * RENDERIZADO DE PESTAÑAS DE SEMESTRE
 */
function renderSemesterTabs() {
    const container = document.getElementById('semester-tabs');
    if (!container) return;

    container.innerHTML = '';
    
    const endSemester = Math.min(startSemester + VISIBLE_SEMESTERS - 1, TOTAL_SEMESTERS);

    for (let i = startSemester; i <= endSemester; i++) {
        const semesterUC = pensum.filter(m => m.semestre === i).reduce((sum, m) => sum + m.uc, 0);
        const isActive = currentSemester === i;
        
        const btn = document.createElement('button');
        const delay = (i - startSemester) * 50;
        btn.style.animationDelay = `${delay}ms`;
        btn.className = `flex items-center gap-3 p-1.5 pr-6 rounded-2xl border transition-all duration-300 semester-animate ${
            isActive 
            ? 'bg-indigo-900 border-indigo-900 shadow-[0_12px_30px_-5px_rgba(30,27,75,0.4)] scale-[1.03] z-10 cursor-default' 
            : 'bg-white border-white/50 backdrop-blur-sm grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-white hover:bg-white/80 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer'
        }`;
        
        btn.onclick = () => {
            currentSemester = i;
            renderAll();
        };

        btn.innerHTML = `
            <div class="size-10 rounded-xl ${isActive ? 'bg-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-slate-100'} flex items-center justify-center ${isActive ? 'text-white' : 'text-slate-400'} font-black text-xs transition-all duration-300">${i < 10 ? '0' + i : i}</div>
            <div class="text-left">
                <span class="block text-xs font-black uppercase tracking-[0.2em] ${isActive ? 'text-white' : 'text-slate-400'} mb-1 transition-colors">Semestre</span>
                <span class="block text-xs font-black ${isActive ? 'text-white' : 'text-slate-800'} leading-none transition-colors"></span>
            </div>
        `;
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
    if (newStart > TOTAL_SEMESTERS - VISIBLE_SEMESTERS + 1) {
        newStart = TOTAL_SEMESTERS - VISIBLE_SEMESTERS + 1;
    }

    if (newStart !== startSemester) {
        startSemester = newStart;
        renderSemesterTabs();
    }
};

/**
 * RENDERIZADO DE MATERIAS
 */
function renderSubjects() {
    const grid = document.getElementById('subjects-grid');
    if (!grid) return;

    const subjects = getMateriasPorSemestre(pensum, currentSemester);
    grid.innerHTML = '';

    subjects.forEach(materia => {
        const disponible = isMateriaDisponible(materia, pensum);
        const card = document.createElement('div');
        
        let borderClass = 'border-l-slate-300/50';
        let statusTag = '';
        let buttons = '';
        const opacidad = disponible ? '' : 'opacity-50 pointer-events-none';

        if (materia.estado === 'aprobada') {
            borderClass = 'border-l-emerald-500';
            statusTag = `
                <div class="flex justify-between items-center mt-6">
                    <span class="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">Aprobada</span>
                    <div class="size-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg class="size-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                </div>`;
        } else {
            statusTag = `
                <div class="flex justify-between items-center mb-6">
                    <span class="text-[9px] font-black uppercase tracking-[0.2em] ${disponible ? 'text-gray-400 bg-gray-50 border-gray-100' : 'text-red-400 bg-red-50 border-red-100'} px-3 py-1.5 rounded-lg border">${disponible ? 'Disponible' : 'Bloqueada'}</span>
                </div>`;
            buttons = `
                <div class="flex gap-2">
                    <button 
                        ${disponible ? `onclick="cambiarEstado(${materia.id}, 'aprobada')"` : 'disabled'} 
                        class="flex-1 py-2.5 ${disponible ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer' : 'bg-gray-200 cursor-not-allowed opacity-50'} text-white rounded-xl text-xs font-bold transition-all shadow-lg">
                        ${disponible ? 'APROBAR MATERIA' : 'PRELACIÓN PENDIENTE'}
                    </button>
                </div>`;
        }

        card.className = `bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 ${borderClass} p-6 flex flex-col min-h-[180px] group hover:shadow-md transition-all ${opacidad}`;
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <span class="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded tracking-wide border border-gray-100">${materia.codigo}</span>
                <span class="text-[10px] font-bold text-gray-300">${materia.uc} UC</span>
            </div>
            <h3 class="text-lg font-bold text-slate-800 mb-auto leading-snug">${materia.nombre}</h3>
            ${statusTag}
            ${buttons}
        `;
        grid.appendChild(card);
    });
}

/**
 * ACTUALIZACIÓN DEL TABLERO
 */
function updateDashboard() {
    const compUC = UC(pensum, 'aprobada');
    const cursoUC = UC(pensum, 'en curso');
    const totalUC = 240;
    const progress = (compUC / totalUC) * 100;

    const elComp = document.getElementById('comp-uc-total');
    const elCurso = document.getElementById('curso-uc-total');
    const elElegir = document.getElementById('elegir-uc-total');
    const elPercent = document.getElementById('progress-percent');
    const elBar = document.getElementById('progress-bar');
    const elText = document.getElementById('progress-text');

    if (elComp) elComp.innerText = compUC;
    if (elCurso) elCurso.innerText = cursoUC;
    if (elElegir) elElegir.innerText = totalUC - compUC - cursoUC;
    
    if (elPercent) elPercent.innerText = `${Math.round(progress)}%`;
    if (elBar) elBar.style.width = `${progress}%`;
    if (elText) elText.innerText = `${compUC} de ${totalUC} UC alcanzadas satisfactoriamente`;
}

/**
 * CAMBIO DE ESTADO (VÍA API)
 */
window.cambiarEstado = async (id, nuevoEstado) => {
    // VALIDACIÓN DE SEGURIDAD EN CLIENTE
    const materia = pensum.find(m => m.id === id);
    if (nuevoEstado === 'aprobada' && !isMateriaDisponible(materia, pensum)) {
        alert('❌ BLOQUEADO: No puedes aprobar esta materia porque aún tienes prelaciones pendientes.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/progreso', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_materia: id, estado: nuevoEstado })
        });
        
        if (!response.ok) throw new Error('Error al guardar progreso');
        
        if (materia) materia.estado = nuevoEstado;
        
        renderAll();
    } catch (error) {
        console.error(error);
        alert("Error al guardar el progreso en la base de datos.");
    }
};

window.resetProgress = async () => {
    if (confirm('¿Estás seguro de que deseas borrar todo tu avance académico? Esta acción no se puede deshacer.')) {
        try {
            const response = await fetch('http://localhost:3000/api/progreso/reset', {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Error al reiniciar progreso');
            
            await fetchPensum(); // Volvemos a cargar los datos limpios
            currentSemester = 1;
            renderAll();
        } catch (error) {
            console.error(error);
            alert("Error al contactar con el servidor para reiniciar el progreso.");
        }
    }
};

function renderAll() {
    renderSemesterTabs();
    renderSubjects();
    updateDashboard();
}

// Inicialización asíncrona
document.addEventListener('DOMContentLoaded', async () => {
    await fetchPensum();
    renderAll();
});
