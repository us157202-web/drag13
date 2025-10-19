const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const container = document.querySelector('.container');
const paint = document.querySelector('#paint');
let drawing = false;

paint.ontouchmove = (e) => {
    const finger = e.touches[0];
    paint.style.left = finger.clientX + 'px';
    paint.style.top = finger.clientY + 'px';
    if (drawing) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = finger.clientX + 'px';
        dot.style.top = finger.clientY + 'px';
        dot.style.transform = 'translate(-50%, -50%)';
        container.appendChild(dot);
    }
}

paint.ontouchstart = (e) => {
    e.preventDefault();
    drawing = true;
}

paint.ontouchend = () => {
    drawing = false;
}

