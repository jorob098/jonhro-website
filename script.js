const toggleBtn = document.querySelector('.menu-toggle');
const navList = document.getElementById('nav-list');

toggleBtn.addEventListener('click', () => {
  navList.classList.toggle('show');
});
