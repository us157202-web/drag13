const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const canvas = document.querySelector('#color');
const output = document.querySelector('#colortext');
const ctx = canvas.getContext('2d');
//캔버스에 2차원 도구상자 ctx 가져옴
canvas.width = 330;
canvas.height = 330;

function getPalette() {
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    //가로 그라디언트
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.25, 'yellow');
    gradient.addColorStop(0.5, 'green');
    gradient.addColorStop(0.75, 'blue');
    gradient.addColorStop(1, 'purple');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let whiteToTransparent = ctx.createLinearGradient(0, 0, 0, canvas.height);
    //세로 그라디언트
    whiteToTransparent.addColorStop(0, 'rgba(255, 255, 255, 1)');
    whiteToTransparent.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = whiteToTransparent;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
}
getPalette();

function handleColorPicking(e) {
    e.preventDefault();
    //기본동작방지. 스크롤 등 안되도록
    const rect = canvas.getBoundingClientRect();
    //캔버스가 화면의 어느 위치에 있는지 파악
    const touch = e.touches[0];
    //화면에 닿아있는 첫 번째 손가락 정보
    let x = Math.floor(touch.clientX - rect.left);
    let y = Math.floor(touch.clientY - rect.top);
    //캔버스 내부 위치 = 화면 전체 위치 - 캔버스 시작 위치
    x = Math.max(0, Math.min(x, canvas.width - 1));
    y = Math.max(0, Math.min(y, canvas.height - 1));
    //자표가 캔버스 너비 벗어나지 않도록

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    //xy가로세로1픽셀 영역의 이미지 데이터 가져옴
    const R = pixelData[0];
    const G = pixelData[1];
    const B = pixelData[2];
    const hexColor = "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1).toUpperCase();
    //rgb를 헥스(웹에서 사용하는 16진수 색상 코드)로 변환

    output.style.backgroundColor = hexColor;
    output.textContent = hexColor;
}
canvas.addEventListener('touchstart', (e) => {
    handleColorPicking(e);
});

canvas.ontouchmove = (e) => {
    handleColorPicking(e);
}

canvas.addEventListener('touchend', () => { });