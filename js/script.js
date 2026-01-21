let parallax__titulo = document.getElementById('parallax__titulo');

let hill1 = document.getElementById('hill1');
let hill2 = document.getElementById('hill2');


window.addEventListener('scroll', () => {
    let value = window.scrollY;
    parallax__titulo.style.marginTop = value *0.5 + 'px';
});