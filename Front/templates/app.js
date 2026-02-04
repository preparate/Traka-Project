import { pensum } from '../../datos.js';
import { getMateriasPorSemestre, isMateriaDisponible, UC } from '../../logic_horarios.js';

let currentSemester = 1;

/**
 * RENDERIZADO DE PESTAÑAS DE SEMESTRE
 */
function renderSemesterTabs() {
    const container = document.getElementById('semester-tabs');
    if (!container) return;

    container.innerHTML = '';
    
    // Semestres del 1 al 9
    for (let i = 1; i <= 9; i++) {
        const semesterUC = pensum.filter(m => m.semestre === i).reduce((sum, m) => sum + m.uc, 0);
        const isActive = currentSemester === i;
        
        const btn = document.createElement('button');
        btn.className = `flex items-center gap-4 p-2 pr-6 rounded-full border border-gray-100 shadow-sm shrink-0 transition-all ${
            isActive 
            ? 'bg-white ring-4 ring-indigo-900/5' 
            : 'bg-white/50 grayscale opacity-70 hover:grayscale-0 hover:opacity-100'
        }`;
        
        btn.onclick = () => {
            currentSemester = i;
            renderAll();
        };

        btn.innerHTML = `
            <div class="size-10 rounded-full ${isActive ? 'bg-indigo-900' : 'bg-blue-600'} flex items-center justify-center text-white font-bold text-xs">${i < 10 ? '0' + i : i}</div>
            <div class="text-left">
                <span class="block text-xs font-black uppercase tracking-widest text-slate-800">${i}° Semestre</span>
                <span class="text-[10px] font-bold text-gray-300">${semesterUC} UC</span>
            </div>
        `;
        container.appendChild(btn);
    }
}

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
                        class="flex-1 py-2.5 ${disponible ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20 active:scale-95' : 'bg-gray-200 cursor-not-allowed opacity-50'} text-white rounded-xl text-xs font-bold transition-all shadow-lg">
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
