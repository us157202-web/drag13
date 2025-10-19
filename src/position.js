const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}


const position = document.querySelector('#position');
const positionMap = document.querySelector('#positionMap');
const output = document.querySelector('#positionText');
const ctx = positionMap.getContext('2d');
//캔버스에 2차원 도구상자 ctx 가져옴
positionMap.width = 330;
positionMap.height = 330;

const img = new Image();
img.src = "position.png";
img.onload = function () {
    ctx.drawImage(img, 0, 0, positionMap.width, positionMap.height);
}

function getPosition(e) {
    e.preventDefault();
    //기본동작방지. 스크롤 등 안되도록
    const rect = positionMap.getBoundingClientRect();
    //캔버스가 화면의 어느 위치에 있는지 파악
    const touch = e.touches[0];
    //화면에 닿아있는 첫 번째 손가락 정보
    let x = Math.floor(touch.clientX - rect.left);
    let y = Math.floor(touch.clientY - rect.top);
    //캔버스 내부 위치 = 화면 전체 위치 - 캔버스 시작 위치
    x = Math.max(0, Math.min(x, positionMap.width - 1));
    y = Math.max(0, Math.min(y, positionMap.height - 1));
    //자표가 캔버스 너비 벗어나지 않도록
    position.style.position = 'absolute';
    position.style.left = touch.clientX + 'px';
    position.style.top = touch.clientY + 'px';

    output.textContent = `내 위치는 x:${x}, y:${y}`;
}
positionMap.addEventListener('touchstart', (e) => {
    getPosition(e);
});

positionMap.ontouchmove = (e) => {
    getPosition(e);
}

positionMap.addEventListener('touchend', () => { });