const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const trackingSlider = document.querySelector('#trackingSlider');
const trackingText = document.querySelector('#tracking');

trackingSlider.addEventListener('input', (e) => {
    const v = e.target.value;
    trackingText.style.letterSpacing = v + 'px';
})