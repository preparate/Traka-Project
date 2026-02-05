//Gestionar la selección y prelaciones

import { pensum } from "./datos.js";

export function validacion(idmateria, datos) {
  const materia = datos.find((m) => m.id === idmateria);
  if (!materia) {
    return "Materia no encontrada";
  }

  if (materia.prelaciones.length === 0) {
    return true;
  }

  const aprobada = materia.prelaciones.every((idprelacion) => {
    const prela = datos.find((m) => m.id === idprelacion);
    return prela && prela.estado === "aprobada";
  });

  return aprobada;
}

export function getMateriasPorSemestre(datos, semestre) {
  return datos.filter((m) => m.semestre === semestre);
}

export function isMateriaDisponible(materia, datos) {
  if (materia.estado === "aprobada" || materia.estado === "en curso") {
    return true;
  }
  return validacion(materia.id, datos);
}

export function UC(datos, estado) {
  return datos
    .filter(m => m.estado === estado)
    .reduce((total, m) => total + m.uc, 0);
}
