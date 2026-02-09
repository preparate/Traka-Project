//Gestionar la selección y prelaciones


export function validacion(idmateria, datos) {
  const materia = datos.find((m) => Number(m.id) === Number(idmateria));
  if (!materia) {
    return false; // Cambiado de string a false
  }

  if (!materia.prelaciones || materia.prelaciones.length === 0) {
    return true;
  }

  return materia.prelaciones.every((idprelacion) => {
    const prela = datos.find((m) => Number(m.id) === Number(idprelacion));
    return prela && prela.estado === "aprobada";
  });
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
