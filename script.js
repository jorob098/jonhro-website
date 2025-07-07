const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});
