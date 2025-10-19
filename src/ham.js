const btn = document.querySelector('#btn');
btn.onclick = () => {
    location.href = 'index.html';
}

const ham = document.querySelector('#ham');
ham.ontouchmove = (e) => {
    const finger = e.touches[0];
    ham.style.left = finger.clientX + 'px';
    ham.style.top = finger.clientY + 'px';
}