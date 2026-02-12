document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carrusel-track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dots = document.querySelectorAll('.dot');
    
    let index = 0;
    const totalSlides = dots.length;

 function move() {
    // Dividimos el 100% entre el total de imágenes (100 / 3 = 33.33)
    // Así, el 'index 1' moverá exactamente una imagen.
    const percentage = index * (100 / totalSlides);
    track.style.transform = `translateX(-${percentage}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-white', i === index);
        dot.classList.toggle('bg-white/50', i !== index);
    });
}

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % totalSlides;
        move();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + totalSlides) % totalSlides;
        move();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            move();
        });
    });

    // Auto-play cada 5 segundos
    setInterval(() => {
        index = (index + 1) % totalSlides;
        move();
    }, 5000);

    move(); // Inicialización visual
});