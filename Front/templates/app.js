import { pensum } from '../../datos.js';
import { getMateriasPorSemestre, isMateriaDisponible, UC } from '../../logic_horarios.js';

let currentSemester = 1;
let startSemester = 1;
const VISIBLE_SEMESTERS = 6;
const TOTAL_SEMESTERS = 9;

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
        // Añadimos una animación escalonada
        const delay = (i - startSemester) * 50;
        btn.style.animationDelay = `${delay}ms`;
        btn.className = `flex items-center gap-3 p-1.5 pr-6 rounded-2xl border transition-all duration-300 semester-animate ${
            isActive 
            ? 'bg-indigo-900 border-indigo-900 shadow-[0_12px_30px_-5px_rgba(30,27,75,0.4)] scale-[1.03] z-10 cursor-default' 
            : 'bg-white border-white/50 backdrop-blur-sm grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-white hover:bg-white/80 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer'
        }`;
        
        btn.onclick = () => {
            currentSemester = i;
            renderAll();
        };

        btn.innerHTML = `
            <div class="size-10 rounded-xl ${isActive ? 'bg-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-slate-100'} flex items-center justify-center ${isActive ? 'text-white' : 'text-slate-400'} font-black text-xs transition-all duration-300">${i < 10 ? '0' + i : i}</div>
            <div class="text-left">
                <span class="block text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-white' : 'text-slate-400'} mb-1 transition-colors">Semestre</span>
                <span class="block text-sm font-black ${isActive ? 'text-white' : 'text-slate-800'} leading-none transition-colors">${i}°</span>
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
    // Delta será +1 o -1, pero multiplicamos por VISIBLE_SEMESTERS para rotar de 4 en 4
    const skip = delta * VISIBLE_SEMESTERS;
    let newStart = startSemester + skip;
    
    // Ajustamos para no salir de los límites
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
        
        // Estilos base según estado
        let borderClass = 'border-l-slate-300/50';
        let statusTag = '';
        let buttons = '';

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
            // Pendiente o Bloqueada
            const opacidad = disponible ? '' : 'opacity-50 pointer-events-none';
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

        card.className = `bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 ${borderClass} p-6 flex flex-col min-h-[180px] group hover:shadow-md transition-all`;
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
 * ACTUALIZACIÓN DE ESTADÍSTICAS
 */
function updateDashboard() {
    const compUC = UC(pensum, 'aprobada');
    const cursoUC = UC(pensum, 'en curso');
    const totalUC = 240;
    const progress = (compUC / totalUC) * 100;

    document.getElementById('comp-uc-total').innerText = compUC;
    document.getElementById('curso-uc-total').innerText = cursoUC;
    document.getElementById('elegir-uc-total').innerText = totalUC - compUC - cursoUC;
    
    document.getElementById('progress-percent').innerText = `${Math.round(progress)}%`;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').innerText = `${compUC} de ${totalUC} UC alcanzadas satisfactoriamente`;
}

/**
 * ACCIONES
 */
/**
 * ACCIONES
 */
window.cambiarEstado = (id, nuevoEstado) => {
    const materia = pensum.find(m => m.id === id);
    if (materia) {
        if (nuevoEstado === 'aprobada' && !isMateriaDisponible(materia, pensum)) {
            alert('No puedes aprobar esta materia aún. Debes completar las prelaciones indicadas en la malla oficial.');
            return;
        }
        materia.estado = nuevoEstado;
        renderAll();
    }
};

window.resetProgress = () => {
    if (confirm('¿Estás seguro de que deseas borrar todo tu avance académico? Esta acción no se puede deshacer.')) {
        pensum.forEach(m => m.estado = 'pendiente');
        currentSemester = 1;
        renderAll();
    }
};

function renderAll() {
    renderSemesterTabs();
    renderSubjects();
    updateDashboard();
}

// Inicialización
document.addEventListener('DOMContentLoaded', renderAll);
