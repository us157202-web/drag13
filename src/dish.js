const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const list = document.querySelector('#dishList');
let dragging = null;
let offsetX = 0;
let offsetY = 0;

list.addEventListener('touchstart', (e) => {
    const item = e.target.closest('.item');
    if (!item) return;
    e.preventDefault();
    dragging = item;
    const touch = e.touches[0];
    const itemRect = dragging.getBoundingClientRect();
    offsetX = touch.clientX - itemRect.left;
    offsetY = touch.clientY - itemRect.top;
    dragging.style.transform = 'scale(1.3)';
    dragging.style.zIndex = 20;
    dragging.style.position = 'absolute';
})

document.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    dragging.style.left = (touchX - offsetX) + 'px';
    dragging.style.top = (touchY - offsetY) + 'px';
    dragging.style.visibility = 'hidden';
    const nowItem = document.elementFromPoint(touchX, touchY);
    dragging.style.visibility = 'visible';
    if (nowItem) {
        const targetItem = nowItem.closest('.item');
        if (targetItem && targetItem !== dragging) {
            const rect = nowItem.getBoundingClientRect();
            const isBefore = touchY < rect.top + rect.height / 2;
            if (isBefore) {
                list.insertBefore(dragging, targetItem);
            } else {
                list.insertBefore(dragging, targetItem.nextSibling);
            }
        }
    }
})

document.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging.classList.remove('dragging');
    dragging.style.transform = 'scale(1.0)';
    dragging.style.zIndex = '';
    dragging.style.position = '';
    dragging.style.left = '';
    dragging.style.top = '';
    dragging = null;
})