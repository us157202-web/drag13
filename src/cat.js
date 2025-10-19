const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const cat = document.querySelector('#cat');
const catX = window.innerWidth / 2;
const catY = window.innerHeight / 2;
const maxIntensity = 30;
const maxDistance = 400;
const stopDistance = 50;
const notouchIntensity = 2;
let touching = false;
let shakeInterval;

function shakeCat(intensity) {
    if (intensity <= 0.1) {
        cat.style.transform = `translate(-50%,-50%)`;
        return;
    }
    const shakeX = (Math.random() - 0.5) * intensity;
    const shakeY = (Math.random() - 0.5) * intensity;
    //-0.5~0.5 랜덤
    cat.style.transform = `translate(-50%, -50%) translate(${shakeX}px, ${shakeY}px)`;
}
//터치x 경우의 흔들림

function touchShake(e) {
    e.preventDefault();
    let finalIntensity;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - catX;
    const deltaY = touchY - catY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    //거리 구하기
    if (distance <= stopDistance) {
        finalIntensity = 0;
    } else {
        const effectiveDistance = Math.min(distance, maxDistance) - stopDistance;
        const effectiveMaxDistance = maxDistance - stopDistance;
        finalIntensity = (effectiveDistance / effectiveMaxDistance) * maxIntensity;
    }
    shakeCat(finalIntensity);
}
//터치한 경우의 흔들림

function startNaturalShake() {
    if (shakeInterval) return;

    shakeInterval = setInterval(() => {
        if (!touching) {
            shakeCat(notouchIntensity);
        }
    }, 100);
}

function stopNaturalShake() {
    if (shakeInterval) {
        clearInterval(shakeInterval);
        shakeInterval = null;
    }
}

document.addEventListener('touchstart', (e) => {
    stopNaturalShake();
    touching = true;
    touchShake(e);
});
document.addEventListener('touchmove', touchShake);
document.addEventListener('touchend', () => {
    touching = false;
    shakeCat(0);
    startNaturalShake();
});

startNaturalShake();
//페이지 열자마자 시작