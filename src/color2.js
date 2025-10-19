const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const sliderR = document.querySelector('#sliderR');
const sliderG = document.querySelector('#sliderG');
const sliderB = document.querySelector('#sliderB');
const sliderText = document.querySelector('#colortext1');
const colorBox = document.querySelector('#box');

const makeColor = () => {
    const r = sliderR.value;
    const g = sliderG.value;
    const b = sliderB.value;


    colorBox.style.backgroundColor = `rgb(${r},${g},${b})`;
    sliderText.textContent = `R:${r}, G:${g}, B:${b}`;
}

sliderR.addEventListener('input', makeColor);
sliderG.addEventListener('input', makeColor);
sliderB.addEventListener('input', makeColor);
makeColor();