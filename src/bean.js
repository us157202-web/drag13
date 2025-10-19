btn.onclick = () => {
    location.href = 'index.html';
}

const bean = document.querySelectorAll('.bean');
const beanzone = document.querySelector('#beanzone');


const getRect = (el) => el.getBoundingClientRect();

bean.forEach(bean => {
    bean.ontouchmove = (e) => {
        e.preventDefault();
        const finger = e.touches[0];
        bean.style.left = finger.clientX + 'px';
        bean.style.top = finger.clientY + 'px';
    }
})