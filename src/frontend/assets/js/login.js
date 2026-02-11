document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturamos el valor del input "documento" (Cédula)
    const cedula = document.getElementById('documento').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!cedula || !password) {
        alert("Por favor, llena todos los campos");
        return;
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/estudiantes/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Enviamos la cédula en el campo 'email' para que el controlador la reciba bien
            body: JSON.stringify({ email: cedula, password: password })
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
            // Guardamos los datos en el navegador
            localStorage.setItem('usuario_id', data.usuario.id);
            localStorage.setItem('usuario_nombre', data.usuario.nombre);
            
            // --- ESTAS SON LAS LÍNEAS QUE DEBES AGREGAR ---
            localStorage.setItem('usuario_apellido', data.usuario.apellido || ""); 
            localStorage.setItem('usuario_cedula', cedula); // Usamos la variable 'cedula' que capturaste arriba
            // ----------------------------------------------

            alert("¡Bienvenido/a, " + data.usuario.nombre + "!");
            
            window.location.href = "plataforma.html"; 
        } else {
            // Mostramos el error que viene del backend (Cédula no registrada / Pass incorrecta)
            alert(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor. ¿Olvidaste hacer 'node server.js'?");
    }
});

// Función para mostrar/ocultar contraseña (el ojito)
const toggleBtn = document.querySelector('form button[type="button"]');
const passInput = document.getElementById('password');

if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passInput.setAttribute('type', type);
    });
}