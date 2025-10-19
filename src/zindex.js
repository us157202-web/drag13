const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const zindex = document.querySelectorAll('.zindex');
let nowMaxZindex = 10;
let nowItem = null;
let offsetX, offsetY = 0;
//터치 하는 곳이 물체의 중심이게 하기 위함

zindex.forEach(zindex => {
    zindex.addEventListener('touchstart', (e) => {
        e.preventDefault();
        nowItem = zindex;
        nowMaxZindex++;
        nowItem.style.zIndex = nowMaxZindex;
        nowItem.classList.add('lifting');

        const finger = e.touches[0];
        const rect = zindex.getBoundingClientRect();
        offsetX = finger.clientX - rect.left;
        offsetY = finger.clientY - rect.top;
    })
})

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!nowItem) return;
    const finger = e.touches[0];
    nowItem.style.left = (finger.clientX - offsetX) + 'px';
    nowItem.style.top = (finger.clientY - offsetY) + 'px';
})

document.addEventListener('touchend', () => {
    if (!nowItem) return;
    nowItem.classList.remove('lifting');
    nowItem = null;
});