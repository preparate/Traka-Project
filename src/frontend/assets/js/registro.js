// Esperamos a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.querySelector('form');
    const togglePassBtn = document.querySelector('button[type="button"]');
    const passwordInput = document.getElementById('password');

    // --- 1. LÓGICA DEL "OJITO" (Mostrar/Ocultar contraseña) ---
    if (togglePassBtn && passwordInput) {
        togglePassBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            // Opcional: Podrías rotar el icono o cambiar el color aquí
            togglePassBtn.classList.toggle('text-blue-600', isPassword);
        });
    }

    // --- 2. LÓGICA DE ENVÍO DEL FORMULARIO ---
    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Extraemos los valores de los inputs usando los IDs de tu HTML
        const fullName = document.getElementById('fullname').value.trim();
        const cedula = document.getElementById('cedula').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Separamos el nombre completo en nombre y apellido (muy básico)
        const nameParts = fullName.split(' ');
        const nombre = nameParts[0];
        const apellido = nameParts.slice(1).join(' ') || 'S/A'; // 'S/A' si no pone apellido

        try {
            const respuesta = await fetch('http://localhost:3000/api/estudiantes/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cedula,
                    nombre,
                    apellido,
                    email,
                    password
                })
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                window.location.href = "login.html"; // Redirigimos al login
            } else {
                alert("Error: " + (data.detalle || data.error));
            }
        } catch (error) {
            console.error("Error en registro:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
});