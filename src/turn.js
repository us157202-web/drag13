const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const turnItem = document.querySelector('#turn');
let dragging = false;
let startX = 0;
let nowRotation = 0;

turnItem.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dragging = true;
    startX = e.touches[0].clientX;
    turnItem.style.transition = 'none';
})

document.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    e.preventDefault();

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    const rotationChange = deltaX * 0.5;
    nowRotation += rotationChange;
    turnItem.style.transform = `translate(-50%, 0) rotate(${nowRotation}deg)`;
    startX = currentX;
});

document.addEventListener('touchend', () => {
    dragging = false;
})