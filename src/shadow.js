const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const item = document.querySelector('#item');
const item2 = document.querySelector('#shadow');
const threshold = 80; //이모티콘 도망가기 시작하는 최소거리
const force = 10; //한 번에 이동하는 거리

let nowTranslateX = 0;
let nowTranslateY = 0;
function initializeItems() {
    if (!item) return;

    const initialTransform = `translate(${nowTranslateX}px, ${nowTranslateY}px)`;
    item.style.transform = initialTransform;

    if (item2) {
        item2.style.transform = initialTransform;
    }
}
initializeItems();

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];

    const itemRect = item.getBoundingClientRect();
    const itemX = itemRect.left + itemRect.width / 2;
    const itemY = itemRect.top + itemRect.height / 2;
    //이모티콘 현재 위치
    const deltaX = touch.clientX - itemX;
    const deltaY = touch.clientY - itemY;
    //중앙-이모티콘 거리차이

    const absDistanceX = Math.abs(deltaX);
    const absDistanceY = Math.abs(deltaY);
    //엑스와이축 절대값

    if (absDistanceX < threshold && absDistanceY < threshold) {
        //특정 거리 안에 있을 때 작동
        const moveX = deltaX < 0 ? force : -force;
        const moveY = deltaY < 0 ? force : -force;

        nowTranslateX += moveX;
        nowTranslateY += moveY;

        const halfWidth = itemRect.width / 2;
        const halfHeight = itemRect.height / 2;
        const maxX = (window.innerWidth / 2) - halfWidth;
        const maxY = (window.innerHeight / 2) - halfHeight;
        nowTranslateX = Math.max(-maxX, Math.min(maxX, nowTranslateX));
        nowTranslateY = Math.max(-maxY, Math.min(maxY, nowTranslateY));

        item.style.transform = `translate(${nowTranslateX}px, ${nowTranslateY}px)`;
        item2.style.transform = `translate(${nowTranslateX}px, ${nowTranslateY}px)`;
    }
});