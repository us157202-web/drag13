const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const zoomin = document.querySelector('#zoomin');
const zoomInZone = document.querySelector('#zoomInZone');

let zoom = 1.0;

const getRect = (el) => el.getBoundingClientRect();

zoomin.ontouchmove = (e) => {
    e.preventDefault();
    const finger = e.touches[0];
    zoomin.style.left = finger.clientX + 'px';
    zoomin.style.top = finger.clientY + 'px';
    const rectIn = getRect(zoomInZone);
    if (finger.clientX > rectIn.left && finger.clientX < rectIn.right &&
        finger.clientY > rectIn.top && finger.clientY < rectIn.bottom) {
        zoom += 0.05;
    }
    zoomin.style.transform = `scale(${zoom})`;
}